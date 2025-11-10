import { useState, useEffect } from 'react'
import { Container, Row, Col, Button, Modal, Form, Card, Badge, Alert } from 'react-bootstrap'

function AdminPanel({ menu, setMenu, onClose }) {
  const [editingItem, setEditingItem] = useState(null)
  const [showModal, setShowModal] = useState(false)
  const [selectedCategory, setSelectedCategory] = useState(null)
  const [alert, setAlert] = useState({ show: false, message: '', type: '' })

  const showAlert = (message, type = 'success') => {
    setAlert({ show: true, message, type })
    setTimeout(() => setAlert({ show: false, message: '', type: '' }), 3000)
  }

  const handleAddProduct = (categoryId) => {
    setSelectedCategory(categoryId)
    setEditingItem({
      nombre: '',
      descripcion: '',
      precio: 0,
      imagen: '🍽️',
      badge: ''
    })
    setShowModal(true)
  }

  const handleEditProduct = (categoryId, item) => {
    setSelectedCategory(categoryId)
    setEditingItem({ ...item })
    setShowModal(true)
  }

  const handleDeleteProduct = (categoryId, itemNombre) => {
    if (window.confirm(`¿Seguro que deseas eliminar "${itemNombre}"?`)) {
      const newMenu = menu.map(cat => {
        if (cat.id === categoryId) {
          return {
            ...cat,
            items: cat.items.filter(item => item.nombre !== itemNombre)
          }
        }
        return cat
      })
      setMenu(newMenu)
      localStorage.setItem('rukavMenu', JSON.stringify(newMenu))
      showAlert('Producto eliminado correctamente', 'success')
    }
  }

  const handleSaveProduct = () => {
    if (!editingItem.nombre || !editingItem.descripcion || editingItem.precio <= 0) {
      showAlert('Por favor completa todos los campos requeridos', 'danger')
      return
    }

    const newMenu = menu.map(cat => {
      if (cat.id === selectedCategory) {
        const existingIndex = cat.items.findIndex(item => item.nombre === editingItem.nombre)
        if (existingIndex >= 0) {
          // Editar producto existente
          const newItems = [...cat.items]
          newItems[existingIndex] = editingItem
          return { ...cat, items: newItems }
        } else {
          // Agregar nuevo producto
          return { ...cat, items: [...cat.items, editingItem] }
        }
      }
      return cat
    })

    setMenu(newMenu)
    localStorage.setItem('rukavMenu', JSON.stringify(newMenu))
    showAlert('Producto guardado correctamente', 'success')
    setShowModal(false)
    setEditingItem(null)
  }

  const handleExportMenu = () => {
    const dataStr = JSON.stringify(menu, null, 2)
    const dataBlob = new Blob([dataStr], { type: 'application/json' })
    const url = URL.createObjectURL(dataBlob)
    const link = document.createElement('a')
    link.href = url
    link.download = 'menu-rukav.json'
    link.click()
    showAlert('Menú exportado correctamente', 'success')
  }

  const handleImportMenu = (e) => {
    const file = e.target.files[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (event) => {
        try {
          const importedMenu = JSON.parse(event.target.result)
          setMenu(importedMenu)
          localStorage.setItem('rukavMenu', JSON.stringify(importedMenu))
          showAlert('Menú importado correctamente', 'success')
        } catch (error) {
          showAlert('Error al importar el menú. Verifica el formato del archivo', 'danger')
        }
      }
      reader.readAsText(file)
    }
  }

  const handleResetMenu = () => {
    if (window.confirm('¿Seguro que deseas restablecer el menú a los valores originales? Esta acción no se puede deshacer.')) {
      localStorage.removeItem('rukavMenu')
      window.location.reload()
    }
  }

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100%',
      height: '100vh',
      backgroundColor: 'rgba(0,0,0,0.95)',
      zIndex: 9999,
      overflowY: 'auto',
      padding: '2rem 0'
    }}>
      <Container>
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h2 className="text-white">🔧 Panel de Administración</h2>
          <Button variant="danger" onClick={onClose}>Cerrar Panel</Button>
        </div>

        {alert.show && (
          <Alert variant={alert.type} dismissible onClose={() => setAlert({ show: false })}>
            {alert.message}
          </Alert>
        )}

        <div className="mb-4 d-flex gap-2 flex-wrap">
          <Button variant="info" onClick={handleExportMenu}>
            📥 Exportar Menú (JSON)
          </Button>
          <label className="btn btn-info">
            📤 Importar Menú (JSON)
            <input
              type="file"
              accept=".json"
              onChange={handleImportMenu}
              style={{ display: 'none' }}
            />
          </label>
          <Button variant="warning" onClick={handleResetMenu}>
            🔄 Restablecer Menú Original
          </Button>
        </div>

        {menu.map(categoria => (
          <Card key={categoria.id} className="mb-4" bg="dark" text="white">
            <Card.Header>
              <div className="d-flex justify-content-between align-items-center">
                <h4 className="mb-0">
                  {categoria.categoria}
                  {categoria.destacado && <Badge bg="danger" className="ms-2">Destacado</Badge>}
                </h4>
                <Button
                  variant="success"
                  size="sm"
                  onClick={() => handleAddProduct(categoria.id)}
                >
                  ➕ Agregar Producto
                </Button>
              </div>
            </Card.Header>
            <Card.Body>
              <Row className="g-3">
                {categoria.items.map((item, idx) => (
                  <Col key={idx} xs={12} md={6} lg={4}>
                    <Card bg="secondary" text="white">
                      <Card.Body>
                        <div className="d-flex justify-content-between align-items-start mb-2">
                          <div style={{ fontSize: '2rem' }}>{item.imagen}</div>
                          {item.badge && <Badge bg="danger">{item.badge}</Badge>}
                        </div>
                        <Card.Title style={{ fontSize: '1rem' }}>{item.nombre}</Card.Title>
                        <Card.Text style={{ fontSize: '0.85rem', minHeight: '3rem' }}>
                          {item.descripcion}
                        </Card.Text>
                        <div className="d-flex justify-content-between align-items-center">
                          <strong style={{ fontSize: '1.2rem' }}>${item.precio.toLocaleString()}</strong>
                          <div className="d-flex gap-1">
                            <Button
                              variant="warning"
                              size="sm"
                              onClick={() => handleEditProduct(categoria.id, item)}
                            >
                              ✏️
                            </Button>
                            <Button
                              variant="danger"
                              size="sm"
                              onClick={() => handleDeleteProduct(categoria.id, item.nombre)}
                            >
                              🗑️
                            </Button>
                          </div>
                        </div>
                      </Card.Body>
                    </Card>
                  </Col>
                ))}
              </Row>
            </Card.Body>
          </Card>
        ))}
      </Container>

      {/* Modal para editar/agregar producto */}
      <Modal show={showModal} onHide={() => setShowModal(false)} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>
            {editingItem && editingItem.nombre ? 'Editar Producto' : 'Agregar Producto'}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {editingItem && (
            <Form>
              <Row>
                <Col md={8}>
                  <Form.Group className="mb-3">
                    <Form.Label>Nombre del Producto *</Form.Label>
                    <Form.Control
                      type="text"
                      value={editingItem.nombre}
                      onChange={(e) => setEditingItem({ ...editingItem, nombre: e.target.value })}
                      placeholder="Ej: Hamburguesa Clásica"
                    />
                  </Form.Group>
                </Col>
                <Col md={4}>
                  <Form.Group className="mb-3">
                    <Form.Label>Emoji/Icono</Form.Label>
                    <Form.Control
                      type="text"
                      value={editingItem.imagen}
                      onChange={(e) => setEditingItem({ ...editingItem, imagen: e.target.value })}
                      placeholder="🍔"
                    />
                  </Form.Group>
                </Col>
              </Row>

              <Form.Group className="mb-3">
                <Form.Label>Descripción *</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  value={editingItem.descripcion}
                  onChange={(e) => setEditingItem({ ...editingItem, descripcion: e.target.value })}
                  placeholder="Descripción detallada del producto..."
                />
              </Form.Group>

              <Row>
                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>Precio (CLP) *</Form.Label>
                    <Form.Control
                      type="number"
                      value={editingItem.precio}
                      onChange={(e) => setEditingItem({ ...editingItem, precio: parseInt(e.target.value) || 0 })}
                      placeholder="5000"
                    />
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>Badge (opcional)</Form.Label>
                    <Form.Control
                      type="text"
                      value={editingItem.badge || ''}
                      onChange={(e) => setEditingItem({ ...editingItem, badge: e.target.value })}
                      placeholder="¡Nuevo! / ¡Popular!"
                    />
                  </Form.Group>
                </Col>
              </Row>
            </Form>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Cancelar
          </Button>
          <Button variant="success" onClick={handleSaveProduct}>
            💾 Guardar Producto
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  )
}

export default AdminPanel
