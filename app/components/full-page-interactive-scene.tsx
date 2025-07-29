"use client"

import { useEffect, useRef, useState } from "react"
import * as THREE from "three"

export default function FullPageInteractiveScene() {
  const mountRef = useRef<HTMLDivElement>(null)
  const sceneRef = useRef<THREE.Scene>()
  const rendererRef = useRef<THREE.WebGLRenderer>()
  const frameRef = useRef<number>()
  const [clickedObjects, setClickedObjects] = useState<Set<string>>(new Set())

  useEffect(() => {
    if (!mountRef.current) return

    // Scene setup
    const scene = new THREE.Scene()
    sceneRef.current = scene

    // Camera setup
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
    camera.position.set(0, 0, 15)

    // Renderer setup
    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: "high-performance",
    })
    renderer.setSize(window.innerWidth, window.innerHeight)
    renderer.setClearColor(0x000000, 0)
    renderer.shadowMap.enabled = true
    renderer.shadowMap.type = THREE.PCFSoftShadowMap
    renderer.toneMapping = THREE.ACESFilmicToneMapping
    renderer.toneMappingExposure = 1.0
    rendererRef.current = renderer
    mountRef.current.appendChild(renderer.domElement)

    // Raycaster for click detection
    const raycaster = new THREE.Raycaster()
    const clickMouse = new THREE.Vector2()

    // Create diverse geometries
    const createGeometries = () => {
      return [
        new THREE.IcosahedronGeometry(1.2, 1),
        new THREE.OctahedronGeometry(1.5, 0),
        new THREE.TorusGeometry(1, 0.4, 16, 100),
        new THREE.TorusKnotGeometry(0.8, 0.3, 100, 16, 2, 3),
        new THREE.BoxGeometry(1.5, 1.5, 1.5),
        new THREE.SphereGeometry(1, 32, 32),
        new THREE.ConeGeometry(1, 2, 8),
        new THREE.DodecahedronGeometry(1, 0),
        new THREE.TetrahedronGeometry(1.3, 0),
        new THREE.CylinderGeometry(0.8, 0.8, 2, 12),
        new THREE.RingGeometry(0.5, 1.2, 16),
        new THREE.TorusKnotGeometry(0.7, 0.25, 100, 16, 3, 4),
      ]
    }

    const geometries = createGeometries()

    // Enhanced materials with click states
    const createMaterials = () => {
      const baseMaterials = [
        { color: 0x00ffff, emissive: 0x001122 },
        { color: 0x3b82f6, emissive: 0x000033 },
        { color: 0x8b5cf6, emissive: 0x220033 },
        { color: 0xec4899, emissive: 0x330022 },
        { color: 0x10b981, emissive: 0x002211 },
        { color: 0xf59e0b, emissive: 0x332200 },
        { color: 0xef4444, emissive: 0x330000 },
      ]

      return baseMaterials.map(({ color, emissive }) => ({
        normal: new THREE.MeshPhongMaterial({
          color,
          wireframe: true,
          transparent: true,
          opacity: 0.7,
          emissive,
          emissiveIntensity: 0.3,
          shininess: 100,
        }),
        clicked: new THREE.MeshPhongMaterial({
          color,
          wireframe: false,
          transparent: true,
          opacity: 0.9,
          emissive: color,
          emissiveIntensity: 0.8,
          shininess: 200,
        }),
        solid: new THREE.MeshPhongMaterial({
          color,
          transparent: true,
          opacity: 0.4,
          emissive,
          emissiveIntensity: 0.4,
          shininess: 150,
        }),
      }))
    }

    const materials = createMaterials()

    const meshes: THREE.Mesh[] = []
    const meshData: Array<{
      mesh: THREE.Mesh
      id: string
      originalPosition: THREE.Vector3
      rotationSpeed: THREE.Vector3
      floatSpeed: number
      floatRange: number
      mouseInfluence: number
      scale: number
      section: string
      clickAnimation: {
        isAnimating: boolean
        startTime: number
        originalScale: number
        targetScale: number
      }
      materials: {
        normal: THREE.MeshPhongMaterial
        clicked: THREE.MeshPhongMaterial
        solid: THREE.MeshPhongMaterial
      }
    }> = []

    // Create objects distributed across different sections
    const sections = [
      { name: "hero", yRange: [0, 8], count: 8, spread: 12 },
      { name: "about", yRange: [-15, -8], count: 6, spread: 10 },
      { name: "skills", yRange: [-30, -22], count: 8, spread: 14 },
      { name: "experience", yRange: [-45, -38], count: 5, spread: 8 },
      { name: "projects", yRange: [-60, -52], count: 10, spread: 16 },
      { name: "contact", yRange: [-75, -68], count: 4, spread: 6 },
    ]

    sections.forEach((section) => {
      for (let i = 0; i < section.count; i++) {
        const geometry = geometries[Math.floor(Math.random() * geometries.length)]
        const materialSet = materials[Math.floor(Math.random() * materials.length)]
        const mesh = new THREE.Mesh(geometry, materialSet.normal)

        // Position objects within section bounds
        const angle = (i / section.count) * Math.PI * 2 + Math.random() * 0.5
        const radius = 3 + Math.random() * section.spread
        const yPos = section.yRange[0] + Math.random() * (section.yRange[1] - section.yRange[0])

        mesh.position.x = Math.cos(angle) * radius + (Math.random() - 0.5) * 4
        mesh.position.y = yPos
        mesh.position.z = Math.sin(angle) * radius + (Math.random() - 0.5) * 8

        // Random rotation
        mesh.rotation.x = Math.random() * Math.PI
        mesh.rotation.y = Math.random() * Math.PI
        mesh.rotation.z = Math.random() * Math.PI

        // Scale variation
        const scale = 0.4 + Math.random() * 0.8
        mesh.scale.setScalar(scale)

        mesh.castShadow = true
        mesh.receiveShadow = true

        const meshId = `${section.name}_${i}`
        mesh.userData = { id: meshId, section: section.name }

        scene.add(mesh)
        meshes.push(mesh)

        meshData.push({
          mesh,
          id: meshId,
          originalPosition: mesh.position.clone(),
          rotationSpeed: new THREE.Vector3(
            (Math.random() - 0.5) * 0.015,
            (Math.random() - 0.5) * 0.015,
            (Math.random() - 0.5) * 0.01,
          ),
          floatSpeed: Math.random() * 0.001 + 0.0005,
          floatRange: Math.random() * 1.2 + 0.3,
          mouseInfluence: 0.3 + Math.random() * 1.0,
          scale: scale,
          section: section.name,
          clickAnimation: {
            isAnimating: false,
            startTime: 0,
            originalScale: scale,
            targetScale: scale * 1.5,
          },
          materials: materialSet,
        })
      }
    })

    // Enhanced particle system
    const createParticleSystem = () => {
      const particleGeometry = new THREE.BufferGeometry()
      const particleCount = 200
      const positions = new Float32Array(particleCount * 3)
      const colors = new Float32Array(particleCount * 3)
      const sizes = new Float32Array(particleCount)

      for (let i = 0; i < particleCount; i++) {
        positions[i * 3] = (Math.random() - 0.5) * 60
        positions[i * 3 + 1] = (Math.random() - 0.5) * 100 - 20
        positions[i * 3 + 2] = (Math.random() - 0.5) * 40

        // Random colors
        const color = new THREE.Color()
        color.setHSL(Math.random() * 0.3 + 0.5, 0.7, 0.5)
        colors[i * 3] = color.r
        colors[i * 3 + 1] = color.g
        colors[i * 3 + 2] = color.b

        sizes[i] = Math.random() * 0.3 + 0.1
      }

      particleGeometry.setAttribute("position", new THREE.BufferAttribute(positions, 3))
      particleGeometry.setAttribute("color", new THREE.BufferAttribute(colors, 3))
      particleGeometry.setAttribute("size", new THREE.BufferAttribute(sizes, 1))

      const particleMaterial = new THREE.PointsMaterial({
        size: 0.2,
        transparent: true,
        opacity: 0.6,
        vertexColors: true,
        blending: THREE.AdditiveBlending,
        sizeAttenuation: true,
      })

      return new THREE.Points(particleGeometry, particleMaterial)
    }

    const particleSystem = createParticleSystem()
    scene.add(particleSystem)

    // Enhanced lighting setup
    const ambientLight = new THREE.AmbientLight(0x404040, 0.3)
    scene.add(ambientLight)

    const directionalLight = new THREE.DirectionalLight(0x00ffff, 0.8)
    directionalLight.position.set(10, 10, 10)
    directionalLight.castShadow = true
    directionalLight.shadow.mapSize.width = 2048
    directionalLight.shadow.mapSize.height = 2048
    scene.add(directionalLight)

    // Multiple point lights
    const pointLights = []
    const lightColors = [0x00ffff, 0x3b82f6, 0x8b5cf6, 0xec4899, 0x10b981, 0xf59e0b]

    for (let i = 0; i < 6; i++) {
      const pointLight = new THREE.PointLight(lightColors[i], 0.4, 40)
      pointLight.position.set(Math.sin((i * Math.PI) / 3) * 15, -20 + i * -10, Math.cos((i * Math.PI) / 3) * 15)
      scene.add(pointLight)
      pointLights.push(pointLight)
    }

    // Mouse interaction variables
    const mouse = new THREE.Vector2()
    const mouseTarget = new THREE.Vector2()
    const windowHalf = new THREE.Vector2(window.innerWidth / 2, window.innerHeight / 2)

    const handleMouseMove = (event: MouseEvent) => {
      mouseTarget.x = (event.clientX - windowHalf.x) / windowHalf.x
      mouseTarget.y = (event.clientY - windowHalf.y) / windowHalf.y
    }
    window.addEventListener("mousemove", handleMouseMove)

    // Click interaction
    const handleClick = (event: MouseEvent) => {
      clickMouse.x = (event.clientX / window.innerWidth) * 2 - 1
      clickMouse.y = -(event.clientY / window.innerHeight) * 2 + 1

      raycaster.setFromCamera(clickMouse, camera)
      const intersects = raycaster.intersectObjects(meshes)

      if (intersects.length > 0) {
        const clickedMesh = intersects[0].object as THREE.Mesh
        const meshInfo = meshData.find((data) => data.mesh === clickedMesh)

        if (meshInfo) {
          // Toggle clicked state
          const isCurrentlyClicked = clickedObjects.has(meshInfo.id)

          setClickedObjects((prev) => {
            const newSet = new Set(prev)
            if (isCurrentlyClicked) {
              newSet.delete(meshInfo.id)
              // Return to normal material
              meshInfo.mesh.material = meshInfo.materials.normal
            } else {
              newSet.add(meshInfo.id)
              // Switch to clicked material
              meshInfo.mesh.material = meshInfo.materials.clicked
            }
            return newSet
          })

          // Start click animation
          meshInfo.clickAnimation.isAnimating = true
          meshInfo.clickAnimation.startTime = Date.now()

          // Create explosion effect
          createClickExplosion(clickedMesh.position)
        }
      }
    }
    window.addEventListener("click", handleClick)

    // Create explosion effect on click
    const createClickExplosion = (position: THREE.Vector3) => {
      const explosionGeometry = new THREE.BufferGeometry()
      const explosionCount = 20
      const explosionPositions = new Float32Array(explosionCount * 3)
      const explosionColors = new Float32Array(explosionCount * 3)

      for (let i = 0; i < explosionCount; i++) {
        explosionPositions[i * 3] = position.x + (Math.random() - 0.5) * 2
        explosionPositions[i * 3 + 1] = position.y + (Math.random() - 0.5) * 2
        explosionPositions[i * 3 + 2] = position.z + (Math.random() - 0.5) * 2

        const color = new THREE.Color()
        color.setHSL(Math.random() * 0.3 + 0.5, 1, 0.7)
        explosionColors[i * 3] = color.r
        explosionColors[i * 3 + 1] = color.g
        explosionColors[i * 3 + 2] = color.b
      }

      explosionGeometry.setAttribute("position", new THREE.BufferAttribute(explosionPositions, 3))
      explosionGeometry.setAttribute("color", new THREE.BufferAttribute(explosionColors, 3))

      const explosionMaterial = new THREE.PointsMaterial({
        size: 0.3,
        transparent: true,
        opacity: 1,
        vertexColors: true,
        blending: THREE.AdditiveBlending,
      })

      const explosion = new THREE.Points(explosionGeometry, explosionMaterial)
      scene.add(explosion)

      // Animate explosion
      const explosionStartTime = Date.now()
      const animateExplosion = () => {
        const elapsed = Date.now() - explosionStartTime
        const progress = elapsed / 1000 // 1 second duration

        if (progress < 1) {
          explosionMaterial.opacity = 1 - progress
          explosionMaterial.size = 0.3 + progress * 0.5

          const positions = explosion.geometry.attributes.position.array as Float32Array
          for (let i = 0; i < positions.length; i += 3) {
            positions[i] += (Math.random() - 0.5) * 0.1
            positions[i + 1] += (Math.random() - 0.5) * 0.1
            positions[i + 2] += (Math.random() - 0.5) * 0.1
          }
          explosion.geometry.attributes.position.needsUpdate = true

          requestAnimationFrame(animateExplosion)
        } else {
          scene.remove(explosion)
          explosion.geometry.dispose()
          explosionMaterial.dispose()
        }
      }
      animateExplosion()
    }

    // Touch support
    const handleTouchMove = (event: TouchEvent) => {
      if (event.touches.length > 0) {
        const touch = event.touches[0]
        mouseTarget.x = (touch.clientX - windowHalf.x) / windowHalf.x
        mouseTarget.y = (touch.clientY - windowHalf.y) / windowHalf.y
      }
    }
    window.addEventListener("touchmove", handleTouchMove)

    const handleTouchEnd = (event: TouchEvent) => {
      if (event.changedTouches.length > 0) {
        const touch = event.changedTouches[0]
        const touchEvent = new MouseEvent("click", {
          clientX: touch.clientX,
          clientY: touch.clientY,
        })
        handleClick(touchEvent)
      }
    }
    window.addEventListener("touchend", handleTouchEnd)

    // Animation loop
    const animate = () => {
      frameRef.current = requestAnimationFrame(animate)

      const time = Date.now() * 0.001

      // Smooth mouse interpolation
      mouse.x += (mouseTarget.x - mouse.x) * 0.03
      mouse.y += (mouseTarget.y - mouse.y) * 0.03

      // Get current scroll position to adjust camera
      const scrollY = window.scrollY
      camera.position.y = scrollY * -0.01

      // Animate meshes
      meshData.forEach((data) => {
        const { mesh, originalPosition, rotationSpeed, floatSpeed, floatRange, mouseInfluence, clickAnimation } = data

        // Rotation animation
        mesh.rotation.x += rotationSpeed.x
        mesh.rotation.y += rotationSpeed.y
        mesh.rotation.z += rotationSpeed.z

        // Floating motion
        const floatY = Math.sin(time * floatSpeed + mesh.position.x) * floatRange
        mesh.position.y = originalPosition.y + floatY

        // Mouse influence
        const mouseEffect = mouseInfluence * 1.5
        mesh.position.x = originalPosition.x + mouse.x * mouseEffect
        mesh.position.z = originalPosition.z + mouse.y * mouseEffect * 0.5

        // Click animation
        if (clickAnimation.isAnimating) {
          const elapsed = Date.now() - clickAnimation.startTime
          const duration = 500 // 500ms animation
          const progress = Math.min(elapsed / duration, 1)

          if (progress < 1) {
            // Bounce effect
            const bounceScale = clickAnimation.originalScale + Math.sin(progress * Math.PI * 2) * 0.3
            mesh.scale.setScalar(bounceScale)
          } else {
            clickAnimation.isAnimating = false
            mesh.scale.setScalar(clickAnimation.originalScale)
          }
        } else {
          // Normal pulsing effect
          const pulse = 1 + Math.sin(time * 2 + mesh.position.x) * 0.05
          mesh.scale.setScalar(data.scale * pulse)
        }

        // Material animation based on mouse proximity and click state
        if (mesh.material instanceof THREE.MeshPhongMaterial) {
          const distance = Math.sqrt(
            Math.pow(mouse.x * mouseEffect - originalPosition.x, 2) +
              Math.pow(mouse.y * mouseEffect * 0.5 - originalPosition.z, 2),
          )
          const proximity = Math.max(0, 1 - distance / 8)

          if (clickedObjects.has(data.id)) {
            mesh.material.emissiveIntensity = 0.8 + proximity * 0.2
          } else {
            mesh.material.emissiveIntensity = 0.2 + proximity * 0.4
            mesh.material.opacity = 0.6 + proximity * 0.3
          }
        }
      })

      // Animate particle system
      const positions = particleSystem.geometry.attributes.position.array as Float32Array
      for (let i = 0; i < positions.length; i += 3) {
        positions[i + 1] += Math.sin(time * 0.0005 + i) * 0.005
        positions[i] += mouse.x * 0.2 * Math.sin(i * 0.01)
        positions[i + 2] += mouse.y * 0.2 * Math.cos(i * 0.01)
      }
      particleSystem.geometry.attributes.position.needsUpdate = true
      particleSystem.rotation.y += 0.0005

      // Camera movement
      camera.position.x += (mouse.x * 1.5 - camera.position.x) * 0.02
      camera.position.z += (15 + mouse.y * 2 - camera.position.z) * 0.02
      camera.lookAt(0, camera.position.y - 5, 0)

      // Animate lights
      pointLights.forEach((light, index) => {
        const lightTime = time * (0.3 + index * 0.05)
        light.position.x = Math.sin(lightTime + mouse.x) * (12 + index * 2)
        light.position.z = Math.cos(lightTime * 1.2 + mouse.y) * (12 + index * 2)
        light.position.y = -20 + index * -10 + Math.sin(lightTime * 2) * 3

        const mouseMovement = Math.abs(mouse.x) + Math.abs(mouse.y)
        light.intensity = 0.4 + mouseMovement * 0.3 + Math.sin(time * 1.5 + index) * 0.1
      })

      renderer.render(scene, camera)
    }
    animate()

    // Handle window resize
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight
      camera.updateProjectionMatrix()
      renderer.setSize(window.innerWidth, window.innerHeight)
      windowHalf.set(window.innerWidth / 2, window.innerHeight / 2)
    }
    window.addEventListener("resize", handleResize)

    // Cleanup
    return () => {
      window.removeEventListener("mousemove", handleMouseMove)
      window.removeEventListener("click", handleClick)
      window.removeEventListener("touchmove", handleTouchMove)
      window.removeEventListener("touchend", handleTouchEnd)
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

  return (
    <>
      <div ref={mountRef} className="fixed inset-0 pointer-events-none z-0" />
      {/* Click interaction overlay */}
      <div className="fixed inset-0 z-0" style={{ pointerEvents: "auto" }} />

      {/* Interaction hints */}
      <div className="fixed top-20 right-4 z-30 hidden lg:block">
        <div className="bg-black/60 backdrop-blur-md rounded-lg p-4 border border-white/20 max-w-xs">
          <h4 className="text-sm font-semibold text-cyan-400 mb-2">Interactive 3D Scene</h4>
          <ul className="text-xs text-gray-300 space-y-1">
            <li>• Move mouse to control objects</li>
            <li>• Click objects to activate them</li>
            <li>• Scroll to explore different sections</li>
            <li className="text-cyan-400">Clicked: {clickedObjects.size} objects</li>
          </ul>
        </div>
      </div>
    </>
  )
}
