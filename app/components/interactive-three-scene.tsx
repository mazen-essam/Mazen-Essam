"use client"

import { useEffect, useRef } from "react"
import * as THREE from "three"

export default function InteractiveThreeScene() {
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
    camera.position.set(0, 0, 10)

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

    // Create modern geometric shapes
    const createGeometries = () => {
      return [
        new THREE.IcosahedronGeometry(1.2, 1),
        new THREE.OctahedronGeometry(1.5, 0),
        new THREE.TorusGeometry(1, 0.4, 16, 100),
        new THREE.TorusKnotGeometry(0.8, 0.3, 100, 16),
        new THREE.BoxGeometry(1.5, 1.5, 1.5),
        new THREE.SphereGeometry(1, 32, 32),
        new THREE.ConeGeometry(1, 2, 8),
        new THREE.DodecahedronGeometry(1, 0),
      ]
    }

    const geometries = createGeometries()

    // Modern materials with interactive properties
    const createMaterials = () => {
      return [
        new THREE.MeshPhongMaterial({
          color: 0x00ffff,
          wireframe: true,
          transparent: true,
          opacity: 0.8,
          emissive: 0x001122,
          emissiveIntensity: 0.3,
        }),
        new THREE.MeshPhongMaterial({
          color: 0x3b82f6,
          wireframe: true,
          transparent: true,
          opacity: 0.7,
          emissive: 0x000033,
          emissiveIntensity: 0.4,
        }),
        new THREE.MeshPhongMaterial({
          color: 0x8b5cf6,
          wireframe: true,
          transparent: true,
          opacity: 0.9,
          emissive: 0x220033,
          emissiveIntensity: 0.2,
        }),
        new THREE.MeshPhongMaterial({
          color: 0xec4899,
          wireframe: true,
          transparent: true,
          opacity: 0.6,
          emissive: 0x330022,
          emissiveIntensity: 0.5,
        }),
        new THREE.MeshPhongMaterial({
          color: 0x00ffff,
          transparent: true,
          opacity: 0.4,
          emissive: 0x003344,
          emissiveIntensity: 0.4,
          shininess: 100,
        }),
      ]
    }

    const materials = createMaterials()

    const meshes: THREE.Mesh[] = []
    const meshData: Array<{
      mesh: THREE.Mesh
      originalPosition: THREE.Vector3
      rotationSpeed: THREE.Vector3
      floatSpeed: number
      floatRange: number
      mouseInfluence: number
      scale: number
    }> = []

    // Create interactive objects
    for (let i = 0; i < 12; i++) {
      const geometry = geometries[Math.floor(Math.random() * geometries.length)]
      const material = materials[Math.floor(Math.random() * materials.length)]
      const mesh = new THREE.Mesh(geometry, material)

      // Position objects in a circular pattern with depth variation
      const angle = (i / 12) * Math.PI * 2
      const radius = 5 + Math.random() * 3
      const depth = (Math.random() - 0.5) * 8

      mesh.position.x = Math.cos(angle) * radius
      mesh.position.y = (Math.random() - 0.5) * 6
      mesh.position.z = Math.sin(angle) * radius + depth

      // Random rotation
      mesh.rotation.x = Math.random() * Math.PI
      mesh.rotation.y = Math.random() * Math.PI
      mesh.rotation.z = Math.random() * Math.PI

      // Scale variation
      const scale = 0.6 + Math.random() * 0.8
      mesh.scale.setScalar(scale)

      mesh.castShadow = true
      mesh.receiveShadow = true

      scene.add(mesh)
      meshes.push(mesh)

      meshData.push({
        mesh,
        originalPosition: mesh.position.clone(),
        rotationSpeed: new THREE.Vector3(
          (Math.random() - 0.5) * 0.02,
          (Math.random() - 0.5) * 0.02,
          (Math.random() - 0.5) * 0.015,
        ),
        floatSpeed: Math.random() * 0.002 + 0.001,
        floatRange: Math.random() * 1.5 + 0.5,
        mouseInfluence: 0.5 + Math.random() * 1.5,
        scale: scale,
      })
    }

    // Create floating particles
    const createParticleSystem = () => {
      const particleGeometry = new THREE.BufferGeometry()
      const particleCount = 150
      const positions = new Float32Array(particleCount * 3)
      const colors = new Float32Array(particleCount * 3)

      for (let i = 0; i < particleCount; i++) {
        positions[i * 3] = (Math.random() - 0.5) * 40
        positions[i * 3 + 1] = (Math.random() - 0.5) * 40
        positions[i * 3 + 2] = (Math.random() - 0.5) * 20

        // Random colors
        const color = new THREE.Color()
        color.setHSL(Math.random() * 0.3 + 0.5, 0.7, 0.5)
        colors[i * 3] = color.r
        colors[i * 3 + 1] = color.g
        colors[i * 3 + 2] = color.b
      }

      particleGeometry.setAttribute("position", new THREE.BufferAttribute(positions, 3))
      particleGeometry.setAttribute("color", new THREE.BufferAttribute(colors, 3))

      const particleMaterial = new THREE.PointsMaterial({
        size: 0.15,
        transparent: true,
        opacity: 0.8,
        vertexColors: true,
        blending: THREE.AdditiveBlending,
      })

      return new THREE.Points(particleGeometry, particleMaterial)
    }

    const particleSystem = createParticleSystem()
    scene.add(particleSystem)

    // Enhanced lighting setup
    const ambientLight = new THREE.AmbientLight(0x404040, 0.4)
    scene.add(ambientLight)

    const directionalLight = new THREE.DirectionalLight(0x00ffff, 1.0)
    directionalLight.position.set(8, 8, 8)
    directionalLight.castShadow = true
    directionalLight.shadow.mapSize.width = 2048
    directionalLight.shadow.mapSize.height = 2048
    scene.add(directionalLight)

    // Multiple point lights for dynamic lighting
    const pointLights = []
    const lightColors = [0x00ffff, 0x3b82f6, 0x8b5cf6, 0xec4899]

    for (let i = 0; i < 4; i++) {
      const pointLight = new THREE.PointLight(lightColors[i], 0.6, 30)
      pointLight.position.set(
        Math.sin((i * Math.PI) / 2) * 12,
        Math.cos((i * Math.PI) / 2) * 12,
        Math.sin((i * Math.PI) / 4) * 8,
      )
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

    // Touch support for mobile
    const handleTouchMove = (event: TouchEvent) => {
      if (event.touches.length > 0) {
        const touch = event.touches[0]
        mouseTarget.x = (touch.clientX - windowHalf.x) / windowHalf.x
        mouseTarget.y = (touch.clientY - windowHalf.y) / windowHalf.y
      }
    }
    window.addEventListener("touchmove", handleTouchMove)

    // Animation loop
    const animate = () => {
      frameRef.current = requestAnimationFrame(animate)

      const time = Date.now() * 0.001

      // Smooth mouse interpolation
      mouse.x += (mouseTarget.x - mouse.x) * 0.05
      mouse.y += (mouseTarget.y - mouse.y) * 0.05

      // Animate meshes with mouse interaction
      meshData.forEach((data, index) => {
        const { mesh, originalPosition, rotationSpeed, floatSpeed, floatRange, mouseInfluence, scale } = data

        // Rotation animation
        mesh.rotation.x += rotationSpeed.x
        mesh.rotation.y += rotationSpeed.y
        mesh.rotation.z += rotationSpeed.z

        // Floating motion
        const floatY = Math.sin(time * floatSpeed + index) * floatRange
        mesh.position.y = originalPosition.y + floatY

        // Mouse influence on position
        const mouseEffect = mouseInfluence * 2
        mesh.position.x = originalPosition.x + mouse.x * mouseEffect
        mesh.position.z = originalPosition.z + mouse.y * mouseEffect * 0.5

        // Scale pulsing effect
        const pulse = 1 + Math.sin(time * 2 + index) * 0.1
        mesh.scale.setScalar(scale * pulse)

        // Material animation based on mouse proximity
        if (mesh.material instanceof THREE.MeshPhongMaterial) {
          const distance = Math.sqrt(
            Math.pow(mouse.x * mouseEffect - originalPosition.x, 2) +
              Math.pow(mouse.y * mouseEffect * 0.5 - originalPosition.z, 2),
          )
          const proximity = Math.max(0, 1 - distance / 5)
          mesh.material.emissiveIntensity = 0.2 + proximity * 0.5
          mesh.material.opacity = 0.6 + proximity * 0.3
        }
      })

      // Animate particle system
      const positions = particleSystem.geometry.attributes.position.array as Float32Array
      for (let i = 0; i < positions.length; i += 3) {
        // Gentle floating motion
        positions[i + 1] += Math.sin(time * 0.001 + i) * 0.01

        // Mouse interaction for particles
        const particleIndex = i / 3
        const mouseInfluenceParticle = 0.5
        positions[i] += mouse.x * mouseInfluenceParticle * Math.sin(particleIndex * 0.1)
        positions[i + 2] += mouse.y * mouseInfluenceParticle * Math.cos(particleIndex * 0.1)
      }
      particleSystem.geometry.attributes.position.needsUpdate = true

      // Rotate particle system
      particleSystem.rotation.y += 0.001
      particleSystem.rotation.x += mouse.y * 0.001

      // Camera movement based on mouse
      camera.position.x += (mouse.x * 2 - camera.position.x) * 0.05
      camera.position.y += (-mouse.y * 2 - camera.position.y) * 0.05
      camera.lookAt(scene.position)

      // Animate lights
      pointLights.forEach((light, index) => {
        const lightTime = time * (0.5 + index * 0.1)
        light.position.x = Math.sin(lightTime + mouse.x) * (15 + index * 3)
        light.position.y = Math.cos(lightTime * 1.3 + mouse.y) * (12 + index * 2)
        light.position.z = Math.sin(lightTime * 0.8) * (10 + index * 2)

        // Dynamic intensity based on mouse movement
        const mouseMovement = Math.abs(mouse.x) + Math.abs(mouse.y)
        light.intensity = 0.6 + mouseMovement * 0.4 + Math.sin(time * 2 + index) * 0.2
      })

      // Animate directional light
      directionalLight.position.x = Math.sin(time * 0.3) * 10 + mouse.x * 5
      directionalLight.position.z = Math.cos(time * 0.3) * 10 + mouse.y * 5
      directionalLight.intensity = 1.0 + Math.abs(mouse.x + mouse.y) * 0.5

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
      window.removeEventListener("touchmove", handleTouchMove)
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

  return <div ref={mountRef} className="absolute inset-0" />
}
