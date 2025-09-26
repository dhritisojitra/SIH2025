import React, { useEffect, useRef, useState } from "react"
import { useParams, Link, useNavigate } from "react-router-dom"
import levels from "../data/levels"
import SpeciesNode from "../components/SpeciesNode" 
import LinkSvg from "../components/LinkSvg"

import { 
  forceSimulation, 
  forceLink, 
  forceManyBody, 
  forceCenter, 
  forceX, 
  forceY 
} from "d3-force"


export default function Game() {
  const { levelId } = useParams()
  const navigate = useNavigate()
  const level = levels.find((l) => l.id === levelId)

  useEffect(() => {
    if (!level) navigate("/")
  }, [level, navigate])

  // responsive board size
  const boardRef = useRef(null)
  const [size, setSize] = useState({ width: 800, height: 500 })
  useEffect(() => {
    if (!boardRef.current) return
    function update() {
      const rect = boardRef.current.getBoundingClientRect()
      // keep a min height so layout is stable
      setSize({ width: Math.max(600, rect.width - 20), height: Math.max(350, rect.height - 120) })
    }
    update()
    const ro = new ResizeObserver(update)
    ro.observe(boardRef.current)
    return () => ro.disconnect()
  }, [])

  if (!level) return null

  // aliveMap: which species are currently alive
  const [aliveMap, setAliveMap] = useState(() => {
    const m = {}
    level.species.forEach((s) => (m[s.id] = true))
    return m
  })

  // hovered node for highlighting neighbors
  const [hovered, setHovered] = useState(null)

  // adjacency for cascade logic & neighbor highlighting
  const adjRef = useRef({})
  useEffect(() => {
    const map = {}
    level.species.forEach((s) => (map[s.id] = new Set()))
    level.links.forEach(([a, b]) => {
      map[a].add(b)
      map[b].add(a)
    })
    adjRef.current = map
  }, [level])

  // nodes & links for d3 simulation (stored in refs so we can update in place)
  const nodesRef = useRef(level.species.map((s, i) => ({ id: s.id, label: s.label })))
  const linksRef = useRef(level.links.map(([a, b]) => ({ source: a, target: b })))

  const simRef = useRef(null)
  // tick counter used to force rerenders on each tick (cheap)
  const [, setTick] = useState(0)

  // create / re-create simulation when level or size changes
  useEffect(() => {
    // initialize x/y if not present
    nodesRef.current.forEach((n, i) => {
      if (n.x == null || n.y == null) {
        // distribute roughly
        n.x = (size.width / (nodesRef.current.length + 1)) * (i + 1)
        n.y = size.height / 2 + (Math.random() - 0.5) * 40
      }
    })

    // cleanup old simulation
    if (simRef.current) {
      simRef.current.stop()
      simRef.current.on("tick", null)
    }

    const sim = forceSimulation(nodesRef.current)
      .force("link", forceLink(linksRef.current).id((d) => d.id).distance(110).strength(1))
      .force("charge", forceManyBody().strength(-250))
      .force("center", forceCenter(size.width / 2, size.height / 2))
      .force("x", forceX(size.width / 2).strength(0.05))
      .force("y", forceY(size.height / 2).strength(0.05))

    // clamp nodes to board with a margin on each tick
    const margin = 50
    sim.on("tick", () => {
      nodesRef.current.forEach((n) => {
        // make sure nodes remain inside bounds while allowing dragging
        n.x = Math.max(margin, Math.min(size.width - margin, n.x))
        n.y = Math.max(margin, Math.min(size.height - margin, n.y))
      })
      // small state change to re-render svg positions
      setTick((t) => t + 1)
    })

    // start
    sim.alpha(1)
    sim.restart()
    simRef.current = sim

    return () => {
      sim.stop()
    }
  }, [level, size.width, size.height])

  // helper: find neighbors
  function neighborsOf(id) {
    return Array.from(adjRef.current[id] || [])
  }

  // cascade removal logic (same as before but using adjRef)
  function removeSpecies(id) {
    setAliveMap((prev) => {
      const alive = { ...prev }
      if (!alive[id]) return alive
      alive[id] = false

      let changed = true
      while (changed) {
        changed = false
        for (const node of Object.keys(alive)) {
          if (!alive[node]) continue
          const neighbors = neighborsOf(node)
          const hasAliveNeighbor = neighbors.some((nb) => alive[nb])
          if (neighbors.length > 0 && !hasAliveNeighbor) {
            alive[node] = false
            changed = true
          }
        }
      }
      return alive
    })
  }

  function resetLevel() {
    const m = {}
    level.species.forEach((s) => (m[s.id] = true))
    setAliveMap(m)
    // gently nudge simulation to relax
    if (simRef.current) {
      simRef.current.alpha(0.8)
      simRef.current.restart()
    }
  }

  // dragging helpers
  function startDrag(ev, node) {
    // prevent default so pointer capture works well
    ev.preventDefault()
    const pointerId = ev.pointerId
    const origX = ev.clientX
    const origY = ev.clientY

    // fix the node at current coords
    node.fx = node.x
    node.fy = node.y
    if (simRef.current) simRef.current.alphaTarget(0.3).restart()

    // move handler
    function onMove(e) {
      // convert client coords to svg coords — since our svg is not transformed, client -> local is ok for position
      const svgRect = boardRef.current.getBoundingClientRect()
      const x = e.clientX - svgRect.left
      const y = e.clientY - svgRect.top
      node.fx = x
      node.fy = y
      // trigger update
      setTick((t) => t + 1)
    }

    function onUp() {
      // release fixed position so simulation can continue
      node.fx = null
      node.fy = null
      if (simRef.current) simRef.current.alphaTarget(0)
      window.removeEventListener("pointermove", onMove)
      window.removeEventListener("pointerup", onUp)
    }

    window.addEventListener("pointermove", onMove)
    window.addEventListener("pointerup", onUp)
  }

  // helper to get node object by id
  function nodeById(id) {
    return nodesRef.current.find((n) => n.id === id)
  }

  return (
    <div className="min-h-screen bg-green-50 p-6 flex flex-col gap-6">
      {/* Level Header */}
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
        <h2 className="text-3xl font-bold text-green-700">{level.title}</h2>
        <div className="flex gap-2">
          <button
            onClick={resetLevel}
            className="px-4 py-2 bg-green-600 text-white rounded-lg shadow hover:bg-green-500 transition"
          >
            Reset
          </button>
          <Link
            to="/levels"
            className="px-4 py-2 border border-green-600 text-green-600 rounded-lg hover:bg-green-100 transition"
          >
            Back
          </Link>
        </div>
      </div>

      {/* Hint */}
      <p className="text-green-800 italic">Hint: {level.hint}</p>

      {/* Game Board */}
      <div
        ref={boardRef}
        className="bg-white rounded-xl shadow p-4 flex justify-center overflow-hidden relative"
        style={{ minHeight: 420 }}
      >
        <svg
          viewBox={`0 0 ${size.width} ${size.height}`}
          className="w-full h-[500px] max-w-4xl"
        >
          {/* subtle background grid */}
          <defs>
            <pattern id="dots" width="40" height="40" patternUnits="userSpaceOnUse">
              <circle cx="1" cy="1" r="0.5" fill="#166534" opacity="0.03" />
            </pattern>
          </defs>
          <rect width={size.width} height={size.height} fill="url(#dots)" />

          {/* Links */}
          {linksRef.current.map((lk, idx) => {
            const a = nodeById(lk.source.id ?? lk.source)
            const b = nodeById(lk.target.id ?? lk.target)
            if (!a || !b) return null
            const aliveA = !!aliveMap[a.id]
            const aliveB = !!aliveMap[b.id]
            // link considered active if both endpoints are alive
            const active = aliveA && aliveB
            // highlight when hovering neighbor
            const hoveredHighlight =
              hovered && (hovered === a.id || hovered === b.id || (adjRef.current[hovered] && (adjRef.current[hovered].has(a.id) || adjRef.current[hovered].has(b.id))))
            return (
              <LinkSvg
                key={idx}
                x1={a.x}
                y1={a.y}
                x2={b.x}
                y2={b.y}
                active={active}
                highlight={hoveredHighlight}
              />
            )
          })}

          {/* Nodes */}
          {nodesRef.current.map((n) => {
            const species = level.species.find((s) => s.id === n.id)
            const alive = !!aliveMap[n.id]
            // highlight if hovered or neighbor of hovered
            const isHovered = hovered === n.id
            const isNeighbor = hovered && adjRef.current[hovered] && adjRef.current[hovered].has(n.id)
            return (
              <g
                key={n.id}
                transform={`translate(${n.x}, ${n.y})`}
                style={{ pointerEvents: "all" }}
              >
                <SpeciesNode
                  id={n.id}
                  x={0}
                  y={0}
                  label={species.label}
                  alive={alive}
                  highlighted={isHovered || isNeighbor}
                  onClick={() => alive && removeSpecies(n.id)}
                  onPointerDown={(ev) => startDrag(ev, n)}
                  onPointerEnter={() => setHovered(n.id)}
                  onPointerLeave={() => setHovered(null)}
                />
              </g>
            )
          })}
        </svg>
      </div>

      {/* Status Panel */}
      <div className="bg-white rounded-xl shadow p-4">
        <h3 className="text-xl font-semibold text-green-700 mb-2">Species Status</h3>
        <ul className="list-none space-y-2">
          {level.species.map((s) => (
            <li key={s.id} className="flex items-center gap-3">
              <span
                className={`inline-block w-3 h-3 rounded-full ${
                  aliveMap[s.id] ? "bg-green-500" : "bg-gray-400"
                }`}
              />
              <div className={aliveMap[s.id] ? "text-green-800" : "text-gray-400 line-through"}>
                <strong>{s.label}</strong> — {aliveMap[s.id] ? "Alive ✅" : "Collapsed ❌"}
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
