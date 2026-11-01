import { useState, useEffect, useReducer } from 'react'
import { Form, Button, Card, Alert, Spinner } from 'react-bootstrap'
import { fetchRoomTypes, addRoomType, deleteRoomType, fetchRooms } from '../api/roomApi'
import { roomTypeFormReducer, formInitialState } from '../reducer/roomTypeReducer'
import { validateRoomTypeName } from '../utils/validate'
import RoomTypeList from '../components/RoomTypeList'
import ModalConfirm from '../components/ModalConfirm'

export default function ManageRoomTypes() {
  const [roomTypes, setRoomTypes] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [formState, formDispatch] = useReducer(roomTypeFormReducer, formInitialState)
  const [showModal, setShowModal] = useState(false)
  const [targetId, setTargetId] = useState(null)
  const [targetName, setTargetName] = useState('')
  const [deleteError, setDeleteError] = useState(null)

  useEffect(() => {
    fetchRoomTypes()
      .then((data) => { setRoomTypes(data); setLoading(false) })
      .catch((err) => { setError(err.message); setLoading(false) })
  }, [])

  const handleAdd = async (e) => {
    e.preventDefault()
    const form = e.currentTarget
    formDispatch({ type: 'SET_VALIDATED', payload: true })
    if (!form.checkValidity()) return
    const validationError = validateRoomTypeName(formState.newName, roomTypes)
    if (validationError) {
      formDispatch({ type: 'SET_ERROR', payload: validationError })
      return
    }

    try {
      const roomType = await addRoomType({ name: formState.newName.trim() })
      setRoomTypes((previous) => [...previous, roomType])
      formDispatch({ type: 'RESET' })
    } catch (err) {
      formDispatch({
        type: 'SET_ERROR',
        payload: err.response?.data?.message || 'Failed to add room type. Please try again.',
      })
    }
  }

  const handleDeleteClick = async (id, name) => {
    setTargetId(id)
    setTargetName(name)
    setDeleteError(null)
    try {
      const rooms = await fetchRooms()
      const inUse = rooms.some((room) => String(room.roomTypeId) === String(id))
      if (inUse) {
        setDeleteError(`Cannot delete "${name}" because one or more rooms use this room type.`)
      }
    } catch {
      setDeleteError('Failed to check whether this room type is in use. Please try again.')
    }
    setShowModal(true)
  }

  const handleDeleteConfirm = async () => {
    if (deleteError) {
      setShowModal(false)
      return
    }
    try {
      await deleteRoomType(targetId)
      setRoomTypes((previous) => previous.filter((roomType) => String(roomType.id) !== String(targetId)))
      setShowModal(false)
    } catch {
      setDeleteError('Failed to delete room type. Please try again.')
    }
  }

  const handleUpdate = (updated) => {
    setRoomTypes((prev) => prev.map((rt) => (rt.id === updated.id ? updated : rt)))
  }

  if (loading) return <Spinner animation="border" className="d-block mx-auto mt-5" />
  if (error) return <Alert variant="danger">{error}</Alert>

  return (
    <div>
      <h2 className="mb-3">Manage Room Types</h2>
      <Card className="shadow-sm p-3 mb-4">
        <Form noValidate validated={formState.validated} onSubmit={handleAdd}>
          <Form.Group className="mb-2">
            <Form.Label>New Room Type Name</Form.Label>
            <Form.Control
              required
              value={formState.newName}
              onChange={(e) => formDispatch({ type: 'SET_NAME', payload: e.target.value })}
              isInvalid={!!formState.nameError}
              placeholder="e.g. Penthouse"
            />
            <Form.Control.Feedback type="invalid">
              {formState.nameError || 'Name is required.'}
            </Form.Control.Feedback>
          </Form.Group>
          <Button type="submit" variant="primary">Add Room Type</Button>
        </Form>
      </Card>
      <RoomTypeList
        roomTypes={roomTypes}
        onDelete={(id) => {
          const rt = roomTypes.find((r) => r.id === id)
          handleDeleteClick(id, rt?.name ?? '')
        }}
        onUpdate={handleUpdate}
      />
      <ModalConfirm
        show={showModal}
        title={deleteError ? 'Cannot Delete' : 'Confirm Delete'}
        body={deleteError ?? `Are you sure you want to delete room type "${targetName}"?`}
        onConfirm={deleteError ? () => setShowModal(false) : handleDeleteConfirm}
        onCancel={() => setShowModal(false)}
        confirmVariant={deleteError ? 'secondary' : 'danger'}
        confirmLabel={deleteError ? 'OK' : 'Delete'}
      />
    </div>
  )
}
