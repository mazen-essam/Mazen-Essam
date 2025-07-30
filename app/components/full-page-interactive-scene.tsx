"use client"

import { useEffect, useRef } from "react"
import * as THREE from "three"

export default function FullPageInteractiveScene() {
  const mountRef = useRef<HTMLDivElement>(null)
  const sceneRef = useRef<THREE.Scene>()
  const rendererRef = useRef<THREE.WebGLRenderer>()
  const frameRef = useRef<number>()

  useEffect(() => {
    if (!mountRef.current) return

    // Scene setup
    const scene = new THREE.Scene()
    sceneRef.current = scene

    // Camera setup
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
    camera.position.set(0, 0, 12)

    // Renderer setup with better quality
    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: "high-performance",
    })
    renderer.setSize(window.innerWidth, window.innerHeight)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    renderer.setClearColor(0x000000, 0)
    renderer.shadowMap.enabled = true
    renderer.shadowMap.type = THREE.PCFSoftShadowMap
    rendererRef.current = renderer
    mountRef.current.appendChild(renderer.domElement)

    // Smaller, more subtle geometries
    const createGeometries = () => {
      return [
        new THREE.IcosahedronGeometry(0.4, 1),
        new THREE.OctahedronGeometry(0.5, 1),
        new THREE.TorusGeometry(0.3, 0.15, 8, 16),
        new THREE.TorusKnotGeometry(0.25, 0.1, 64, 8),
        new THREE.BoxGeometry(0.4, 0.4, 0.4, 1, 1, 1),
        new THREE.SphereGeometry(0.35, 16, 16),
        new THREE.ConeGeometry(0.3, 0.6, 8),
        new THREE.DodecahedronGeometry(0.35, 1),
        new THREE.TetrahedronGeometry(0.4, 1),
        new THREE.CylinderGeometry(0.25, 0.25, 0.5, 8),
      ]
    }

    const geometries = createGeometries()

    // Subtle materials - no click states needed
    const createMaterials = () => {
      const colors = [
        0x00ffff, 0x3b82f6, 0x8b5cf6, 0xec4899, 0x10b981, 0xf59e0b, 0xef4444, 0x06b6d4, 0x84cc16, 0xf97316,
      ]

      return colors.map(
        (color) =>
          new THREE.MeshPhongMaterial({
            color,
            wireframe: true,
            transparent: true,
            opacity: 0.4, // More subtle
            emissive: color,
            emissiveIntensity: 0.15,
            shininess: 100,
          }),
      )
    }

    const materials = createMaterials()

    const meshes: THREE.Mesh[] = []
    const meshData: Array<{
      mesh: THREE.Mesh
      sectionY: number
      basePosition: THREE.Vector3
      targetPosition: THREE.Vector3
      currentPosition: THREE.Vector3
      rotationSpeed: THREE.Vector3
      baseRotation: THREE.Vector3
      targetRotation: THREE.Vector3
      currentRotation: THREE.Vector3
      floatPhase: number
      scale: number
    }> = []

    // Create smaller, more distributed objects
    const sections = [
      { name: "hero", yPosition: 0, count: 6 },
      { name: "about", yPosition: -800, count: 4 },
      { name: "skills", yPosition: -1600, count: 8 },
      { name: "experience", yPosition: -2400, count: 4 },
      { name: "projects", yPosition: -3200, count: 8 },
      { name: "contact", yPosition: -4000, count: 3 },
    ]

    sections.forEach((section) => {
      for (let i = 0; i < section.count; i++) {
        const geometry = geometries[Math.floor(Math.random() * geometries.length)]
        const material = materials[Math.floor(Math.random() * materials.length)]
        const mesh = new THREE.Mesh(geometry, material)

        // Better distribution with more spacing
        const angle = (i / section.count) * Math.PI * 2
        const radius = 8 + Math.random() * 10
        const offsetX = Math.cos(angle) * radius + (Math.random() - 0.5) * 3
        const offsetZ = Math.sin(angle) * radius + (Math.random() - 0.5) * 5

        const basePosition = new THREE.Vector3(offsetX, 0, offsetZ)
        mesh.position.copy(basePosition)

        const baseRotation = new THREE.Vector3(
          Math.random() * Math.PI,
          Math.random() * Math.PI,
          Math.random() * Math.PI,
        )
        mesh.rotation.set(baseRotation.x, baseRotation.y, baseRotation.z)

        // Smaller, more consistent scale
        const scale = 0.3 + Math.random() * 0.4
        mesh.scale.setScalar(scale)

        mesh.castShadow = true
        mesh.receiveShadow = true

        scene.add(mesh)
        meshes.push(mesh)

        meshData.push({
          mesh,
          sectionY: section.yPosition,
          basePosition: basePosition.clone(),
          targetPosition: basePosition.clone(),
          currentPosition: basePosition.clone(),
          rotationSpeed: new THREE.Vector3(
            (Math.random() - 0.5) * 0.005,
            (Math.random() - 0.5) * 0.005,
            (Math.random() - 0.5) * 0.003,
          ),
          baseRotation: baseRotation.clone(),
          targetRotation: baseRotation.clone(),
          currentRotation: baseRotation.clone(),
          floatPhase: Math.random() * Math.PI * 2,
          scale: scale,
        })
      }
    })

    // Subtle particle system
    const createParticleSystem = () => {
      const particleGeometry = new THREE.BufferGeometry()
      const particleCount = 100
      const positions = new Float32Array(particleCount * 3)
      const colors = new Float32Array(particleCount * 3)
      const originalPositions = new Float32Array(particleCount * 3)

      for (let i = 0; i < particleCount; i++) {
        const x = (Math.random() - 0.5) * 50
        const y = Math.random() * -4500
        const z = (Math.random() - 0.5) * 30

        positions[i * 3] = x
        positions[i * 3 + 1] = y
        positions[i * 3 + 2] = z

        originalPositions[i * 3] = x
        originalPositions[i * 3 + 1] = y
        originalPositions[i * 3 + 2] = z

        const hue = Math.random() * 0.3 + 0.5
        const color = new THREE.Color()
        color.setHSL(hue, 0.6, 0.5)
        colors[i * 3] = color.r
        colors[i * 3 + 1] = color.g
        colors[i * 3 + 2] = color.b
      }

      particleGeometry.setAttribute("position", new THREE.BufferAttribute(positions, 3))
      particleGeometry.setAttribute("color", new THREE.BufferAttribute(colors, 3))
      particleGeometry.userData = { originalPositions }

      const particleMaterial = new THREE.PointsMaterial({
        size: 0.15,
        transparent: true,
        opacity: 0.5,
        vertexColors: true,
        blending: THREE.AdditiveBlending,
      })

      return new THREE.Points(particleGeometry, particleMaterial)
    }

    const particles = createParticleSystem()
    scene.add(particles)

    // Subtle lighting
    const ambientLight = new THREE.AmbientLight(0x404040, 0.5)
    scene.add(ambientLight)

    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.6)
    directionalLight.position.set(10, 10, 5)
    scene.add(directionalLight)

    const pointLight1 = new THREE.PointLight(0x00ffff, 0.8, 50)
    pointLight1.position.set(15, 0, 15)
    scene.add(pointLight1)

    const pointLight2 = new THREE.PointLight(0x8b5cf6, 0.6, 50)
    pointLight2.position.set(-15, 0, -15)
    scene.add(pointLight2)

    // Smooth mouse interaction (no clicks)
    const mouse = new THREE.Vector2()
    const mouseTarget = new THREE.Vector2()

    const handleMouseMove = (event: MouseEvent) => {
      mouseTarget.x = (event.clientX / window.innerWidth) * 2 - 1
      mouseTarget.y = -(event.clientY / window.innerHeight) * 2 + 1
    }
    window.addEventListener("mousemove", handleMouseMove)

    // Smooth animation loop
    const animate = () => {
      frameRef.current = requestAnimationFrame(animate)

      const time = Date.now() * 0.001
      const scrollY = window.scrollY

      // Smooth mouse interpolation
      mouse.x += (mouseTarget.x - mouse.x) * 0.05
      mouse.y += (mouseTarget.y - mouse.y) * 0.05

      // Smooth camera movement
      const targetCameraY = scrollY * 0.008
      camera.position.y += (targetCameraY - camera.position.y) * 0.1

      // Update mesh positions with smooth interpolation
      meshData.forEach((data, index) => {
        const {
          mesh,
          sectionY,
          basePosition,
          targetPosition,
          currentPosition,
          rotationSpeed,
          baseRotation,
          targetRotation,
          currentRotation,
          floatPhase,
        } = data

        // Calculate smooth target position
        const relativeY = (sectionY + scrollY) * 0.008
        const floatY = Math.sin(time * 0.3 + floatPhase) * 0.2
        const mouseInfluenceX = mouse.x * 0.8
        const mouseInfluenceZ = mouse.y * 0.5

        targetPosition.set(basePosition.x + mouseInfluenceX, relativeY + floatY, basePosition.z + mouseInfluenceZ)

        // Smooth position interpolation
        currentPosition.lerp(targetPosition, 0.03)
        mesh.position.copy(currentPosition)

        // Smooth rotation
        targetRotation.x = baseRotation.x + time * rotationSpeed.x
        targetRotation.y = baseRotation.y + time * rotationSpeed.y
        targetRotation.z = baseRotation.z + time * rotationSpeed.z

        currentRotation.lerp(targetRotation, 0.02)
        mesh.rotation.copy(currentRotation)

        // Subtle glow animation
        if (mesh.material instanceof THREE.MeshPhongMaterial) {
          const targetIntensity = 0.15 + Math.sin(time * 1.2 + index) * 0.05
          const currentIntensity = mesh.material.emissiveIntensity
          mesh.material.emissiveIntensity = currentIntensity + (targetIntensity - currentIntensity) * 0.1
        }
      })

      // Smooth particle movement
      const particlePositions = particles.geometry.attributes.position.array as Float32Array
      const originalPositions = particles.geometry.userData.originalPositions as Float32Array

      for (let i = 0; i < particlePositions.length; i += 3) {
        const originalY = originalPositions[i + 1]
        const relativeY = (originalY + scrollY) * 0.005

        particlePositions[i] = originalPositions[i] + Math.sin(time * 0.2 + i * 0.1) * 1.0 + mouse.x * 1.0
        particlePositions[i + 1] = relativeY + Math.sin(time * 0.3 + i * 0.1) * 0.2
        particlePositions[i + 2] = originalPositions[i + 2] + Math.cos(time * 0.2 + i * 0.1) * 0.8 + mouse.y * 0.8
      }
      particles.geometry.attributes.position.needsUpdate = true

      // Smooth light movement
      const targetLight1Y = scrollY * 0.008 + Math.sin(time * 0.5) * 1.5
      const targetLight2Y = scrollY * 0.008 + Math.cos(time * 0.7) * 1.5

      pointLight1.position.y += (targetLight1Y - pointLight1.position.y) * 0.1
      pointLight2.position.y += (targetLight2Y - pointLight2.position.y) * 0.1

      camera.lookAt(0, camera.position.y + 1, 0)
      renderer.render(scene, camera)
    }
    animate()

    // Handle window resize
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight
      camera.updateProjectionMatrix()
      renderer.setSize(window.innerWidth, window.innerHeight)
    }
    window.addEventListener("resize", handleResize)

    // Cleanup
    return () => {
      window.removeEventListener("mousemove", handleMouseMove)
      window.removeEventListener("resize", handleResize)
      if (frameRef.current) {
        cancelAnimationFrame(frameRef.current)
      }
      if (mountRef.current && renderer.domElement) {
        mountRef.current.removeChild(renderer.domElement)
      }
      renderer.dispose()
    }
  }, [])

  return <div ref={mountRef} className="fixed inset-0 pointer-events-none z-0" />
}
