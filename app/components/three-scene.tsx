"use client"

import { useEffect, useRef } from "react"
import * as THREE from "three"

export default function ThreeScene() {
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
    camera.position.z = 12

    // Renderer setup with enhanced settings
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
    renderer.toneMappingExposure = 1.2
    rendererRef.current = renderer
    mountRef.current.appendChild(renderer.domElement)

    // Create advanced geometric shapes with more complexity
    const createAdvancedGeometries = () => {
      const geometries = []

      // Complex polyhedrons
      geometries.push(new THREE.IcosahedronGeometry(1.5, 2))
      geometries.push(new THREE.OctahedronGeometry(1.8, 1))
      geometries.push(new THREE.DodecahedronGeometry(1.2, 0))

      // Torus variations
      geometries.push(new THREE.TorusGeometry(1.2, 0.4, 16, 100))
      geometries.push(new THREE.TorusKnotGeometry(1, 0.3, 100, 16, 2, 3))
      geometries.push(new THREE.TorusKnotGeometry(0.8, 0.25, 100, 16, 3, 4))

      // Custom complex shapes
      const customGeometry1 = new THREE.ConeGeometry(1, 2.5, 8)
      const customGeometry2 = new THREE.CylinderGeometry(0.5, 1.2, 2, 12)
      geometries.push(customGeometry1, customGeometry2)

      // Sphere variations
      geometries.push(new THREE.SphereGeometry(1.2, 32, 32))

      return geometries
    }

    const geometries = createAdvancedGeometries()

    // Enhanced materials with special effects
    const createAdvancedMaterials = () => {
      const materials = []

      // Holographic wireframe materials
      materials.push(
        new THREE.MeshPhongMaterial({
          color: 0x00ffff,
          wireframe: true,
          transparent: true,
          opacity: 0.8,
          emissive: 0x002244,
          emissiveIntensity: 0.3,
          shininess: 100,
        }),
      )

      materials.push(
        new THREE.MeshPhongMaterial({
          color: 0x3b82f6,
          wireframe: true,
          transparent: true,
          opacity: 0.7,
          emissive: 0x001133,
          emissiveIntensity: 0.4,
          shininess: 80,
        }),
      )

      materials.push(
        new THREE.MeshPhongMaterial({
          color: 0x8b5cf6,
          wireframe: true,
          transparent: true,
          opacity: 0.9,
          emissive: 0x220044,
          emissiveIntensity: 0.2,
          shininess: 120,
        }),
      )

      materials.push(
        new THREE.MeshPhongMaterial({
          color: 0xec4899,
          wireframe: true,
          transparent: true,
          opacity: 0.6,
          emissive: 0x330022,
          emissiveIntensity: 0.5,
          shininess: 90,
        }),
      )

      // Solid materials with glow effect
      materials.push(
        new THREE.MeshPhongMaterial({
          color: 0x00ffff,
          transparent: true,
          opacity: 0.3,
          emissive: 0x004466,
          emissiveIntensity: 0.6,
          shininess: 200,
        }),
      )

      return materials
    }

    const materials = createAdvancedMaterials()

    const meshes: THREE.Mesh[] = []
    const meshData: Array<{
      mesh: THREE.Mesh
      rotationSpeed: THREE.Vector3
      floatSpeed: number
      floatRange: number
      originalY: number
      morphSpeed: number
      pulseSpeed: number
      orbitRadius: number
      orbitSpeed: number
      orbitAngle: number
    }> = []

    // Create floating objects with enhanced properties
    for (let i = 0; i < 25; i++) {
      const geometry = geometries[Math.floor(Math.random() * geometries.length)]
      const material = materials[Math.floor(Math.random() * materials.length)]
      const mesh = new THREE.Mesh(geometry, material)

      // Enhanced positioning with layered depth
      const layer = Math.floor(i / 8)
      mesh.position.x = (Math.random() - 0.5) * (30 + layer * 10)
      mesh.position.y = (Math.random() - 0.5) * (30 + layer * 10)
      mesh.position.z = (Math.random() - 0.5) * (20 + layer * 5)

      // Random rotation
      mesh.rotation.x = Math.random() * Math.PI * 2
      mesh.rotation.y = Math.random() * Math.PI * 2
      mesh.rotation.z = Math.random() * Math.PI * 2

      // Enhanced scale with more variation
      const scale = Math.random() * 1.2 + 0.4
      mesh.scale.setScalar(scale)

      // Enable shadows
      mesh.castShadow = true
      mesh.receiveShadow = true

      scene.add(mesh)
      meshes.push(mesh)

      // Store enhanced animation data
      meshData.push({
        mesh,
        rotationSpeed: new THREE.Vector3(
          (Math.random() - 0.5) * 0.03,
          (Math.random() - 0.5) * 0.03,
          (Math.random() - 0.5) * 0.02,
        ),
        floatSpeed: Math.random() * 0.003 + 0.001,
        floatRange: Math.random() * 3 + 1.5,
        originalY: mesh.position.y,
        morphSpeed: Math.random() * 0.002 + 0.001,
        pulseSpeed: Math.random() * 0.004 + 0.002,
        orbitRadius: Math.random() * 5 + 2,
        orbitSpeed: Math.random() * 0.001 + 0.0005,
        orbitAngle: Math.random() * Math.PI * 2,
      })
    }

    // Create floating particles
    const createParticleSystem = () => {
      const particleGeometry = new THREE.BufferGeometry()
      const particleCount = 200
      const positions = new Float32Array(particleCount * 3)

      for (let i = 0; i < particleCount * 3; i += 3) {
        positions[i] = (Math.random() - 0.5) * 50
        positions[i + 1] = (Math.random() - 0.5) * 50
        positions[i + 2] = (Math.random() - 0.5) * 30
      }

      particleGeometry.setAttribute("position", new THREE.BufferAttribute(positions, 3))

      const particleMaterial = new THREE.PointsMaterial({
        color: 0x00ffff,
        size: 0.1,
        transparent: true,
        opacity: 0.6,
        blending: THREE.AdditiveBlending,
      })

      const particles = new THREE.Points(particleGeometry, particleMaterial)
      scene.add(particles)

      return particles
    }

    const particleSystem = createParticleSystem()

    // Enhanced lighting setup with dynamic colors
    const ambientLight = new THREE.AmbientLight(0x404040, 0.3)
    scene.add(ambientLight)

    const directionalLight = new THREE.DirectionalLight(0x00ffff, 1.2)
    directionalLight.position.set(8, 8, 8)
    directionalLight.castShadow = true
    directionalLight.shadow.mapSize.width = 4096
    directionalLight.shadow.mapSize.height = 4096
    directionalLight.shadow.camera.near = 0.1
    directionalLight.shadow.camera.far = 50
    directionalLight.shadow.camera.left = -20
    directionalLight.shadow.camera.right = 20
    directionalLight.shadow.camera.top = 20
    directionalLight.shadow.camera.bottom = -20
    scene.add(directionalLight)

    // Multiple colored point lights
    const pointLights = []
    const lightColors = [0x00ffff, 0x3b82f6, 0x8b5cf6, 0xec4899]

    for (let i = 0; i < 4; i++) {
      const pointLight = new THREE.PointLight(lightColors[i], 0.8, 60)
      pointLight.position.set(
        Math.sin((i * Math.PI) / 2) * 15,
        Math.cos((i * Math.PI) / 2) * 15,
        Math.sin((i * Math.PI) / 4) * 10,
      )
      scene.add(pointLight)
      pointLights.push(pointLight)
    }

    // Mouse interaction with enhanced responsiveness
    const mouse = new THREE.Vector2()
    const targetCameraPosition = new THREE.Vector3()

    const handleMouseMove = (event: MouseEvent) => {
      mouse.x = (event.clientX / window.innerWidth) * 2 - 1
      mouse.y = -(event.clientY / window.innerHeight) * 2 + 1

      targetCameraPosition.x = mouse.x * 3
      targetCameraPosition.y = mouse.y * 3
    }
    window.addEventListener("mousemove", handleMouseMove)

    // Enhanced animation loop
    const animate = () => {
      frameRef.current = requestAnimationFrame(animate)

      const time = Date.now() * 0.001

      // Animate meshes with complex behaviors
      meshData.forEach((data, index) => {
        const {
          mesh,
          rotationSpeed,
          floatSpeed,
          floatRange,
          originalY,
          morphSpeed,
          pulseSpeed,
          orbitRadius,
          orbitSpeed,
          orbitAngle,
        } = data

        // Enhanced rotation with varying speeds
        mesh.rotation.x += rotationSpeed.x * (1 + Math.sin(time * 0.5) * 0.3)
        mesh.rotation.y += rotationSpeed.y * (1 + Math.cos(time * 0.3) * 0.3)
        mesh.rotation.z += rotationSpeed.z * (1 + Math.sin(time * 0.7) * 0.2)

        // Complex floating motion with multiple sine waves
        mesh.position.y =
          originalY +
          Math.sin(time * floatSpeed + index) * floatRange +
          Math.sin(time * floatSpeed * 2 + index * 0.5) * (floatRange * 0.3) +
          Math.cos(time * floatSpeed * 0.5 + index * 0.3) * (floatRange * 0.2)

        // Orbital motion around original position
        const orbitX = Math.sin(time * orbitSpeed + orbitAngle) * orbitRadius * 0.3
        const orbitZ = Math.cos(time * orbitSpeed + orbitAngle) * orbitRadius * 0.3

        // Enhanced mouse interaction with individual responsiveness
        const responsiveness = 0.03 + (index % 5) * 0.01
        const mouseInfluence = 1 + Math.sin(time + index) * 0.2

        mesh.position.x += (mouse.x * 4 * mouseInfluence + orbitX - mesh.position.x) * responsiveness
        mesh.position.z += (mouse.y * 3 * mouseInfluence + orbitZ - mesh.position.z) * responsiveness

        // Dynamic pulsing effect with multiple frequencies
        const pulseScale =
          1 +
          Math.sin(time * pulseSpeed + index) * 0.15 +
          Math.sin(time * pulseSpeed * 3 + index * 2) * 0.05 +
          Math.cos(time * pulseSpeed * 0.7 + index * 1.5) * 0.08

        const baseScale = 0.4 + Math.random() * 0.8
        mesh.scale.setScalar(baseScale * pulseScale)

        // Material opacity animation
        if (mesh.material instanceof THREE.MeshPhongMaterial) {
          mesh.material.opacity = 0.6 + Math.sin(time * 2 + index) * 0.3
          mesh.material.emissiveIntensity = 0.3 + Math.sin(time * 1.5 + index * 0.5) * 0.2
        }
      })

      // Animate particle system
      if (particleSystem) {
        particleSystem.rotation.y += 0.001
        particleSystem.rotation.x += 0.0005

        const positions = particleSystem.geometry.attributes.position.array as Float32Array
        for (let i = 0; i < positions.length; i += 3) {
          positions[i + 1] += Math.sin(time * 0.001 + i) * 0.01
        }
        particleSystem.geometry.attributes.position.needsUpdate = true
      }

      // Enhanced camera movement with smooth transitions
      camera.position.x += (targetCameraPosition.x - camera.position.x) * 0.08
      camera.position.y += (targetCameraPosition.y - camera.position.y) * 0.08

      // Camera gentle orbit with multiple motion layers
      camera.position.x += Math.sin(time * 0.1) * 0.2 + Math.sin(time * 0.05) * 0.1
      camera.position.y += Math.cos(time * 0.15) * 0.15 + Math.cos(time * 0.08) * 0.08
      camera.position.z += Math.sin(time * 0.12) * 0.1

      camera.lookAt(scene.position)

      // Animate lights with complex patterns
      pointLights.forEach((light, index) => {
        const lightTime = time * (0.5 + index * 0.1)
        light.position.x = Math.sin(lightTime) * (20 + index * 5) + Math.cos(lightTime * 2) * 5
        light.position.y = Math.cos(lightTime * 1.3) * (15 + index * 3) + Math.sin(lightTime * 1.7) * 3
        light.position.z = Math.sin(lightTime * 0.8) * (12 + index * 2) + Math.cos(lightTime * 1.2) * 4

        // Dynamic light intensity
        light.intensity = 0.8 + Math.sin(time * 2 + index) * 0.3
      })

      // Animate directional light
      directionalLight.position.x = Math.sin(time * 0.3) * 10
      directionalLight.position.z = Math.cos(time * 0.3) * 10
      directionalLight.intensity = 1.2 + Math.sin(time * 1.5) * 0.3

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

  return <div ref={mountRef} className="absolute inset-0" />
}
