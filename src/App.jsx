import { useState } from 'react'
import logo from './assets/logo.png'
import './App.css'

function App() {
  const [modalPedido, setModalPedido] = useState(false)
  const [modalContacto, setModalContacto] = useState(false)
  const [productoSeleccionado, setProductoSeleccionado] = useState(null)
  const [carrito, setCarrito] = useState([])
  const [formData, setFormData] = useState({
    nombre: '',
    telefono: '',
    direccion: '',
    comentarios: ''
  })

  const menu = [
    {
      id: 1,
      categoria: 'Hamburguesas',
      items: [
        { nombre: 'Ruka Clásica', descripcion: 'Pan integral, hamburguesa de lentejas, lechuga, tomate, cebolla morada', precio: 5500, imagen: '🍔' },
        { nombre: 'Ruka BBQ', descripcion: 'Pan brioche, hamburguesa de garbanzos, salsa BBQ vegana, cebolla caramelizada', precio: 6000, imagen: '🍔' },
        { nombre: 'Ruka Picante', descripcion: 'Pan de papa, hamburguesa de porotos negros, jalapeños, salsa chipotle', precio: 6500, imagen: '🍔' }
      ]
    },
    {
      id: 2,
      categoria: 'Wraps',
      items: [
        { nombre: 'Wrap Mediterráneo', descripcion: 'Tortilla integral, hummus, vegetales asados, aceitunas', precio: 5000, imagen: '🌯' },
        { nombre: 'Wrap Mexicano', descripcion: 'Tortilla de maíz, frijoles, guacamole, pico de gallo', precio: 5200, imagen: '🌯' },
        { nombre: 'Wrap Falafel', descripcion: 'Tortilla de espinaca, falafel, tahini, vegetales frescos', precio: 5800, imagen: '🌯' }
      ]
    },
    {
      id: 3,
      categoria: 'Bowls',
      items: [
        { nombre: 'Buddha Bowl', descripcion: 'Quinoa, garbanzos especiados, vegetales rostizados, tahini', precio: 6500, imagen: '🥗' },
        { nombre: 'Poke Bowl Vegano', descripcion: 'Arroz sushi, tofu marinado, edamame, aguacate, algas', precio: 7000, imagen: '🥗' },
        { nombre: 'Bowl Proteico', descripcion: 'Arroz integral, lentejas, tempeh, kale, salsa de maní', precio: 6800, imagen: '🥗' }
      ]
    },
    {
      id: 4,
      categoria: 'Bebidas',
      items: [
        { nombre: 'Smoothie Verde', descripcion: 'Espinaca, plátano, manzana, jengibre', precio: 3500, imagen: '🥤' },
        { nombre: 'Batido de Frutos Rojos', descripcion: 'Frutillas, arándanos, leche de almendras', precio: 3500, imagen: '🥤' },
        { nombre: 'Jugo Natural', descripcion: 'Naranja, zanahoria o manzana', precio: 2500, imagen: '🧃' }
      ]
    },
    {
      id: 5,
      categoria: 'Postres',
      items: [
        { nombre: 'Brownie Vegano', descripcion: 'Chocolate belga, nueces, sin azúcar refinada', precio: 2800, imagen: '🍰' },
        { nombre: 'Cheesecake de Frutos Rojos', descripcion: 'Base de dátiles, crema de anacardos', precio: 3200, imagen: '🍰' },
        { nombre: 'Galletas Chocochip', descripcion: '3 unidades, chips de chocolate vegano', precio: 2000, imagen: '🍪' }
      ]
    }
  ]

  const agregarAlCarrito = (item) => {
    const itemExistente = carrito.find(i => i.nombre === item.nombre)
    if (itemExistente) {
      setCarrito(carrito.map(i => 
        i.nombre === item.nombre ? { ...i, cantidad: i.cantidad + 1 } : i
      ))
    } else {
      setCarrito([...carrito, { ...item, cantidad: 1 }])
    }
  }

  const eliminarDelCarrito = (nombre) => {
    setCarrito(carrito.filter(item => item.nombre !== nombre))
  }

  const calcularTotal = () => {
    return carrito.reduce((total, item) => total + (item.precio * item.cantidad), 0)
  }

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const enviarPedido = (e) => {
    e.preventDefault()
    
    const detalleCarrito = carrito.map(item => 
      `${item.cantidad}x ${item.nombre} - $${item.precio * item.cantidad}`
    ).join('\n')
    
    const mensaje = `
NUEVO PEDIDO - RUKA VEGANA

--- CLIENTE ---
Nombre: ${formData.nombre}
Teléfono: ${formData.telefono}
Dirección: ${formData.direccion}

--- PEDIDO ---
${detalleCarrito}

TOTAL: $${calcularTotal()}

Comentarios: ${formData.comentarios || 'Sin comentarios'}
    `.trim()
    
    const mailtoLink = `mailto:contacto@rukav0km.app?subject=Nuevo Pedido Ruka Vegana&body=${encodeURIComponent(mensaje)}`
    window.location.href = mailtoLink
    
    setTimeout(() => {
      setModalPedido(false)
      setCarrito([])
      setFormData({ nombre: '', telefono: '', direccion: '', comentarios: '' })
    }, 500)
  }

  const enviarContacto = (e) => {
    e.preventDefault()
    
    const mensaje = `
CONTACTO - RUKA VEGANA

Nombre: ${formData.nombre}
Teléfono: ${formData.telefono}

Mensaje:
${formData.comentarios}
    `.trim()
    
    const mailtoLink = `mailto:contacto@rukav0km.app?subject=Consulta Ruka Vegana&body=${encodeURIComponent(mensaje)}`
    window.location.href = mailtoLink
    
    setTimeout(() => {
      setModalContacto(false)
      setFormData({ nombre: '', telefono: '', direccion: '', comentarios: '' })
    }, 500)
  }

  return (
    <div style={{ backgroundColor: '#f8f8f8', minHeight: '100vh' }}>
      {/* Header */}
      <header style={{
        backgroundColor: '#4a7c59',
        color: 'white',
        padding: '1.5rem 2rem',
        position: 'sticky',
        top: 0,
        zIndex: 100,
        boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
      }}>
        <div style={{ 
          maxWidth: '1200px', 
          margin: '0 auto',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '1rem'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <img src={logo} alt="Ruka Vegana" style={{ height: '60px', width: '60px', objectFit: 'contain' }} />
            <div>
              <h1 style={{ margin: 0, fontSize: 'clamp(1.5rem, 4vw, 2rem)' }}>Ruka Vegana</h1>
              <p style={{ margin: 0, fontSize: 'clamp(0.9rem, 2vw, 1rem)', opacity: 0.9 }}>Angol - Comida Rápida 100% Vegana</p>
            </div>
          </div>
          <div style={{ display: 'flex', gap: '1rem' }}>
            <button
              onClick={() => setModalContacto(true)}
              style={{
                backgroundColor: 'white',
                color: '#4a7c59',
                border: 'none',
                padding: '0.8rem 1.5rem',
                borderRadius: '8px',
                fontWeight: 'bold',
                cursor: 'pointer',
                fontSize: 'clamp(0.9rem, 2vw, 1rem)'
              }}
            >
              📞 Contacto
            </button>
            {carrito.length > 0 && (
              <button
                onClick={() => setModalPedido(true)}
                style={{
                  backgroundColor: '#8fbc8f',
                  color: 'white',
                  border: 'none',
                  padding: '0.8rem 1.5rem',
                  borderRadius: '8px',
                  fontWeight: 'bold',
                  cursor: 'pointer',
                  position: 'relative',
                  fontSize: 'clamp(0.9rem, 2vw, 1rem)'
                }}
              >
                🛒 Carrito ({carrito.length})
              </button>
            )}
          </div>
        </div>
      </header>

      {/* Menu */}
      <main style={{ padding: '2rem', maxWidth: '1200px', margin: '0 auto' }}>
        <section style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <h2 style={{ fontSize: 'clamp(1.8rem, 4vw, 2.5rem)', color: '#4a7c59', marginBottom: '0.5rem' }}>
            Nuestro Menú
          </h2>
          <p style={{ fontSize: 'clamp(1rem, 2vw, 1.2rem)', color: '#666' }}>
            Comida rápida vegana, saludable y deliciosa 🌱
          </p>
        </section>

        {menu.map(categoria => (
          <section key={categoria.id} style={{ marginBottom: '3rem' }}>
            <h3 style={{
              fontSize: 'clamp(1.5rem, 3vw, 2rem)',
              color: '#4a7c59',
              marginBottom: '1.5rem',
              paddingBottom: '0.5rem',
              borderBottom: '3px solid #8fbc8f'
            }}>
              {categoria.categoria}
            </h3>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
              gap: '1.5rem'
            }}>
              {categoria.items.map((item, index) => (
                <div key={index} style={{
                  backgroundColor: 'white',
                  borderRadius: '12px',
                  padding: '1.5rem',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                  transition: 'transform 0.3s, box-shadow 0.3s'
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.transform = 'translateY(-5px)'
                  e.currentTarget.style.boxShadow = '0 8px 20px rgba(0,0,0,0.15)'
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)'
                  e.currentTarget.style.boxShadow = '0 2px 8px rgba(0,0,0,0.1)'
                }}>
                  <div style={{ fontSize: '4rem', textAlign: 'center', marginBottom: '1rem' }}>
                    {item.imagen}
                  </div>
                  <h4 style={{ color: '#333', fontSize: '1.3rem', marginBottom: '0.5rem' }}>
                    {item.nombre}
                  </h4>
                  <p style={{ color: '#666', fontSize: '0.95rem', marginBottom: '1rem', lineHeight: '1.5' }}>
                    {item.descripcion}
                  </p>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#4a7c59' }}>
                      ${item.precio.toLocaleString()}
                    </span>
                    <button
                      onClick={() => agregarAlCarrito(item)}
                      style={{
                        backgroundColor: '#4a7c59',
                        color: 'white',
                        border: 'none',
                        padding: '0.6rem 1.2rem',
                        borderRadius: '6px',
                        fontWeight: 'bold',
                        cursor: 'pointer',
                        fontSize: '0.95rem'
                      }}
                    >
                      Agregar
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </section>
        ))}
      </main>

      {/* Modal Pedido */}
      {modalPedido && (
        <div onClick={() => setModalPedido(false)} style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: '100vh',
          backgroundColor: 'rgba(0,0,0,0.7)',
          zIndex: 1000,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          padding: '1rem'
        }}>
          <div onClick={(e) => e.stopPropagation()} style={{
            backgroundColor: 'white',
            borderRadius: '12px',
            padding: 'clamp(1.5rem, 4vw, 2rem)',
            maxWidth: '600px',
            width: '100%',
            maxHeight: '90vh',
            overflowY: 'auto'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
              <h2 style={{ color: '#4a7c59', margin: 0, fontSize: 'clamp(1.3rem, 4vw, 1.8rem)' }}>
                Tu Pedido
              </h2>
              <button onClick={() => setModalPedido(false)} style={{
                backgroundColor: 'transparent',
                border: 'none',
                fontSize: '2rem',
                cursor: 'pointer',
                color: '#666'
              }}>×</button>
            </div>

            <div style={{ marginBottom: '1.5rem' }}>
              {carrito.map((item, index) => (
                <div key={index} style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  padding: '1rem',
                  backgroundColor: '#f8f8f8',
                  borderRadius: '8px',
                  marginBottom: '0.8rem'
                }}>
                  <div style={{ flex: 1 }}>
                    <p style={{ margin: 0, fontWeight: 'bold', color: '#333' }}>
                      {item.cantidad}x {item.nombre}
                    </p>
                    <p style={{ margin: 0, color: '#666', fontSize: '0.9rem' }}>
                      ${item.precio.toLocaleString()} c/u
                    </p>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                    <span style={{ fontWeight: 'bold', color: '#4a7c59' }}>
                      ${(item.precio * item.cantidad).toLocaleString()}
                    </span>
                    <button
                      onClick={() => eliminarDelCarrito(item.nombre)}
                      style={{
                        backgroundColor: '#ff6b6b',
                        color: 'white',
                        border: 'none',
                        padding: '0.4rem 0.8rem',
                        borderRadius: '4px',
                        cursor: 'pointer',
                        fontSize: '0.9rem'
                      }}
                    >
                      Eliminar
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div style={{
              padding: '1rem',
              backgroundColor: '#4a7c59',
              color: 'white',
              borderRadius: '8px',
              marginBottom: '1.5rem',
              textAlign: 'center'
            }}>
              <p style={{ margin: 0, fontSize: '1.2rem', fontWeight: 'bold' }}>
                Total: ${calcularTotal().toLocaleString()}
              </p>
            </div>

            <form onSubmit={enviarPedido}>
              <div style={{ marginBottom: '1rem' }}>
                <label style={{ display: 'block', marginBottom: '0.5rem', color: '#333', fontWeight: 'bold' }}>
                  Nombre completo *
                </label>
                <input
                  type="text"
                  name="nombre"
                  value={formData.nombre}
                  onChange={handleInputChange}
                  required
                  style={{
                    width: '100%',
                    padding: '0.8rem',
                    border: '2px solid #e0e0e0',
                    borderRadius: '6px',
                    fontSize: '1rem',
                    boxSizing: 'border-box'
                  }}
                  placeholder="Tu nombre"
                />
              </div>

              <div style={{ marginBottom: '1rem' }}>
                <label style={{ display: 'block', marginBottom: '0.5rem', color: '#333', fontWeight: 'bold' }}>
                  Teléfono *
                </label>
                <input
                  type="tel"
                  name="telefono"
                  value={formData.telefono}
                  onChange={handleInputChange}
                  required
                  style={{
                    width: '100%',
                    padding: '0.8rem',
                    border: '2px solid #e0e0e0',
                    borderRadius: '6px',
                    fontSize: '1rem',
                    boxSizing: 'border-box'
                  }}
                  placeholder="+56 9 1234 5678"
                />
              </div>

              <div style={{ marginBottom: '1rem' }}>
                <label style={{ display: 'block', marginBottom: '0.5rem', color: '#333', fontWeight: 'bold' }}>
                  Dirección de entrega *
                </label>
                <input
                  type="text"
                  name="direccion"
                  value={formData.direccion}
                  onChange={handleInputChange}
                  required
                  style={{
                    width: '100%',
                    padding: '0.8rem',
                    border: '2px solid #e0e0e0',
                    borderRadius: '6px',
                    fontSize: '1rem',
                    boxSizing: 'border-box'
                  }}
                  placeholder="Calle, número, comuna"
                />
              </div>

              <div style={{ marginBottom: '1.5rem' }}>
                <label style={{ display: 'block', marginBottom: '0.5rem', color: '#333', fontWeight: 'bold' }}>
                  Comentarios (opcional)
                </label>
                <textarea
                  name="comentarios"
                  value={formData.comentarios}
                  onChange={handleInputChange}
                  rows="3"
                  style={{
                    width: '100%',
                    padding: '0.8rem',
                    border: '2px solid #e0e0e0',
                    borderRadius: '6px',
                    fontSize: '1rem',
                    boxSizing: 'border-box',
                    resize: 'vertical',
                    fontFamily: 'inherit'
                  }}
                  placeholder="Sin cebolla, extra salsa, etc."
                />
              </div>

              <button
                type="submit"
                style={{
                  width: '100%',
                  padding: '1rem',
                  backgroundColor: '#4a7c59',
                  color: 'white',
                  border: 'none',
                  borderRadius: '8px',
                  fontSize: '1.1rem',
                  fontWeight: 'bold',
                  cursor: 'pointer'
                }}
              >
                Enviar Pedido 🚀
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Modal Contacto */}
      {modalContacto && (
        <div onClick={() => setModalContacto(false)} style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: '100vh',
          backgroundColor: 'rgba(0,0,0,0.7)',
          zIndex: 1000,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          padding: '1rem'
        }}>
          <div onClick={(e) => e.stopPropagation()} style={{
            backgroundColor: 'white',
            borderRadius: '12px',
            padding: 'clamp(1.5rem, 4vw, 2rem)',
            maxWidth: '500px',
            width: '100%',
            maxHeight: '90vh',
            overflowY: 'auto'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
              <h2 style={{ color: '#4a7c59', margin: 0, fontSize: 'clamp(1.3rem, 4vw, 1.8rem)' }}>
                Contáctanos
              </h2>
              <button onClick={() => setModalContacto(false)} style={{
                backgroundColor: 'transparent',
                border: 'none',
                fontSize: '2rem',
                cursor: 'pointer',
                color: '#666'
              }}>×</button>
            </div>

            <form onSubmit={enviarContacto}>
              <div style={{ marginBottom: '1rem' }}>
                <label style={{ display: 'block', marginBottom: '0.5rem', color: '#333', fontWeight: 'bold' }}>
                  Nombre *
                </label>
                <input
                  type="text"
                  name="nombre"
                  value={formData.nombre}
                  onChange={handleInputChange}
                  required
                  style={{
                    width: '100%',
                    padding: '0.8rem',
                    border: '2px solid #e0e0e0',
                    borderRadius: '6px',
                    fontSize: '1rem',
                    boxSizing: 'border-box'
                  }}
                  placeholder="Tu nombre"
                />
              </div>

              <div style={{ marginBottom: '1rem' }}>
                <label style={{ display: 'block', marginBottom: '0.5rem', color: '#333', fontWeight: 'bold' }}>
                  Teléfono *
                </label>
                <input
                  type="tel"
                  name="telefono"
                  value={formData.telefono}
                  onChange={handleInputChange}
                  required
                  style={{
                    width: '100%',
                    padding: '0.8rem',
                    border: '2px solid #e0e0e0',
                    borderRadius: '6px',
                    fontSize: '1rem',
                    boxSizing: 'border-box'
                  }}
                  placeholder="+56 9 1234 5678"
                />
              </div>

              <div style={{ marginBottom: '1.5rem' }}>
                <label style={{ display: 'block', marginBottom: '0.5rem', color: '#333', fontWeight: 'bold' }}>
                  Mensaje *
                </label>
                <textarea
                  name="comentarios"
                  value={formData.comentarios}
                  onChange={handleInputChange}
                  required
                  rows="4"
                  style={{
                    width: '100%',
                    padding: '0.8rem',
                    border: '2px solid #e0e0e0',
                    borderRadius: '6px',
                    fontSize: '1rem',
                    boxSizing: 'border-box',
                    resize: 'vertical',
                    fontFamily: 'inherit'
                  }}
                  placeholder="Tu consulta o comentario..."
                />
              </div>

              <button
                type="submit"
                style={{
                  width: '100%',
                  padding: '1rem',
                  backgroundColor: '#4a7c59',
                  color: 'white',
                  border: 'none',
                  borderRadius: '8px',
                  fontSize: '1.1rem',
                  fontWeight: 'bold',
                  cursor: 'pointer'
                }}
              >
                Enviar Mensaje 📧
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer style={{
        backgroundColor: '#4a7c59',
        color: 'white',
        padding: '2rem',
        marginTop: '4rem',
        textAlign: 'center'
      }}>
        <p style={{ margin: 0, fontSize: '1rem' }}>
          © 2025 Ruka Vegana Angol - Comida Rápida 100% Vegana
        </p>
        <p style={{ margin: '0.5rem 0 0 0', fontSize: '0.9rem', opacity: 0.8 }}>
          🌱 Saludable • Deliciosa • Sustentable
        </p>
      </footer>
    </div>
  )
}

export default App
