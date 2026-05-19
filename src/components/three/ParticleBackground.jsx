import { useEffect, useRef } from 'react'
import * as THREE from 'three'

export default function ParticleBackground() {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const W = window.innerWidth
    const H = window.innerHeight

    const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true })
    renderer.setSize(W, H)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(75, W / H, 0.1, 1000)
    camera.position.z = 5

    // --- PARTICLES SETUP ---
    const COUNT = 1500 // Number of particles
    const geo = new THREE.BufferGeometry()
    
    const pos = new Float32Array(COUNT * 3)
    const col = new Float32Array(COUNT * 3)

    const palette = [
      new THREE.Color('#7C3AED'), // Violet
      new THREE.Color('#06B6D4'), // Cyan
      new THREE.Color('#F59E0B'), // Amber
      new THREE.Color('#8B5CF6'), // Lighter Violet
    ]

    for (let i = 0; i < COUNT; i++) {
      // Random positions
      pos[i * 3]     = (Math.random() - 0.5) * 20
      pos[i * 3 + 1] = (Math.random() - 0.5) * 20
      pos[i * 3 + 2] = (Math.random() - 0.5) * 10

      // Random colors from palette
      const c = palette[Math.floor(Math.random() * palette.length)]
      col[i * 3]     = c.r
      col[i * 3 + 1] = c.g
      col[i * 3 + 2] = c.b
    }

    geo.setAttribute('position', new THREE.BufferAttribute(pos, 3))
    geo.setAttribute('color', new THREE.BufferAttribute(col, 3))

    const mat = new THREE.PointsMaterial({
      size: 0.025,
      vertexColors: true,
      transparent: true,
      opacity: 0.5
    })

    const points = new THREE.Points(geo, mat)
    scene.add(points)

    // --- MOUSE PARALLAX ---
    let mx = 0, my = 0
    const onMove = (e) => {
      mx = (e.clientX / window.innerWidth - 0.5) * 0.3
      my = (e.clientY / window.innerHeight - 0.5) * 0.3
    }
    window.addEventListener('mousemove', onMove)

    // --- ANIMATION LOOP ---
    let frameId
    const tick = () => {
      // Rotate the whole particle system slowly
      points.rotation.y += 0.0004
      points.rotation.x += 0.0001
      
      // Move camera based on mouse
      camera.position.x += (mx - camera.position.x) * 0.02
      camera.position.y += (-my - camera.position.y) * 0.02
      
      renderer.render(scene, camera)
      frameId = requestAnimationFrame(tick)
    }
    tick()

    // --- RESIZE HANDLER ---
    const onResize = () => {
      renderer.setSize(window.innerWidth, window.innerHeight)
      camera.aspect = window.innerWidth / window.innerHeight
      camera.updateProjectionMatrix()
    }
    window.addEventListener('resize', onResize)

    // --- CLEANUP ---
    return () => {
      window.removeEventListener('mousemove', onMove)
      window.removeEventListener('resize', onResize)
      cancelAnimationFrame(frameId)
      renderer.dispose()
      geo.dispose()
      mat.dispose()
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full pointer-events-none"
      style={{ zIndex: 0 }}
    />
  )
}