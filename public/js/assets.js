const assetForm = document.querySelector('#asset-form')
const formMessage = document.querySelector('#asset-form-message')
const assetPanel = document.querySelector('.asset-form-panel')
const assetsSection = document.querySelector('#assets')
const saveButton = assetForm.querySelector('button[type="submit"]')
const cancelButton = document.querySelector('#cancel-asset-edit')

let editingId = null

assetForm.addEventListener('submit', async (event) => {
  event.preventDefault()

  const formData = new FormData(assetForm)

  const asset = {
    name: formData.get('name'),
    category: formData.get('category'),
    continuityStatus: formData.get('continuityStatus')
  }

  const url = editingId ? `/api/assets/${editingId}` : '/api/assets'
  const method = editingId ? 'PUT' : 'POST'

  formMessage.textContent = ''
  saveButton.disabled = true

  try {
    const response = await fetch(url, {
      method,
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(asset)
    })

    if (!response.ok) {
      throw new Error('Could not save asset')
    }

    window.location.reload()
  } catch (error) {
    console.error(error)
    formMessage.textContent = 'Could not save the asset. Please try again.'
    saveButton.disabled = false
  }
})

assetsSection.addEventListener('click', async (event) => {
  const editButton = event.target.closest('.edit-asset')

  if (editButton) {
    editingId = editButton.dataset.id

    assetForm.elements.namedItem('name').value = editButton.dataset.name
    assetForm.elements.namedItem('category').value = editButton.dataset.category
    assetForm.elements.namedItem('continuityStatus').value = editButton.dataset.status

    saveButton.textContent = 'Update Asset'
    cancelButton.hidden = false
    formMessage.textContent = ''
    assetPanel.open = true

    assetPanel.scrollIntoView({ behavior: 'smooth', block: 'center' })
    return
  }

  const deleteButton = event.target.closest('.delete-asset')

  if (!deleteButton) return

  const confirmed = window.confirm(
    `Delete "${deleteButton.dataset.name}"? This cannot be undone.`
  )

  if (!confirmed) return

  deleteButton.disabled = true

  try {
    const response = await fetch(`/api/assets/${deleteButton.dataset.id}`, {
      method: 'DELETE'
    })

    if (!response.ok) {
      throw new Error('Could not delete asset')
    }

    window.location.reload()
  } catch (error) {
    console.error(error)
    window.alert('Could not delete the asset. Please try again.')
    deleteButton.disabled = false
  }
})

cancelButton.addEventListener('click', () => {
  editingId = null
  assetForm.reset()
  saveButton.textContent = 'Save Asset'
  cancelButton.hidden = true
  formMessage.textContent = ''
})