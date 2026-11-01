import { useState } from 'react'
import { Table, Button, Form } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import { validateRoomTypeName } from '../utils/validate'
import { updateRoomType } from '../api/roomApi'

export default function RoomTypeList({ roomTypes, onDelete, onUpdate }) {
  const navigate = useNavigate()
  const [editingId, setEditingId] = useState(null)
  const [editValue, setEditValue] = useState('')
  const [editError, setEditError] = useState(null)
  const startEdit = (rt) => {
    setEditingId(rt.id)
    setEditValue(rt.name)
    setEditError(null)
  }

  const handleEditSave = async (id) => {
    const err = validateRoomTypeName(editValue, roomTypes, id)
    if (err) { setEditError(err); return }
    try {
      const updated = await updateRoomType(id, { name: editValue.trim() })
      onUpdate(updated)
      setEditingId(null)
    } catch {
      setEditError('Failed to update. Please try again.')
    }
  }

  return (
    <>
      <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {roomTypes.map((rt, idx) => (
            <tr key={rt.id}>
              <td>{idx + 1}</td>
              <td>
                {editingId === rt.id ? (
                  <>
                    <Form.Control
                      value={editValue}
                      onChange={(e) => { setEditValue(e.target.value); setEditError(null) }}
                      isInvalid={!!editError}
                    />
                    {editError && <Form.Control.Feedback type="invalid">{editError}</Form.Control.Feedback>}
                  </>
                ) : rt.name}
              </td>
              <td className="d-flex gap-2 flex-wrap">
                <Button size="sm" variant="info" onClick={() => navigate(`/room-types/${rt.id}`)}>View Details</Button>
                {editingId === rt.id ? (
                  <>
                    <Button size="sm" variant="success" onClick={() => handleEditSave(rt.id)}>Save</Button>
                    <Button size="sm" variant="secondary" onClick={() => setEditingId(null)}>Cancel</Button>
                  </>
                ) : (
                  <Button size="sm" variant="warning" onClick={() => startEdit(rt)}>Edit</Button>
                )}
                <Button size="sm" variant="danger" onClick={() => onDelete(rt.id)}>Delete</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </>
  )
}
