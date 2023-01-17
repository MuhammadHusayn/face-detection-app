const search = document.querySelectorAll('.row')
const wrapper = document.querySelector('tbody')
const dataTables_empty = document.querySelector('.dataTables_empty')
const addBranchBtn = document.querySelector('.bank-save-btn')
const addBranchInput = document.querySelector('.form-control-addbranch')
const alertModal = document.querySelector('.swal2-container')
const alertModelCloseBtn = document.querySelector('.swal2-confirm')
const alertTitle = document.querySelector('.swal2-title')
const alertDescripsion = document.querySelector('#swal2-content')
const removeSort1 = document.querySelector('.sorting_asc')
const removeSort = document.querySelectorAll('.sorting')

function remove(){
    for (const i of removeSort) {
        i.classList.add('no-after')
        i.classList.add('no-before')
    }
    removeSort1.classList.add('no-after')
    removeSort1.classList.add('no-before')
    if(dataTables_empty){
        dataTables_empty.remove()
    }
    search[2].remove()
    search[4].remove()
}
remove()

function alertClose(action){
    alertModelCloseBtn.onclick = () => {
        if(action == 200){
            alertModal.classList.add('display_none')
            location.reload()
        } else {
            alertModal.classList.add('display_none')
        }
    }
}

function editBranch(){
    const allEditBtn = document.querySelectorAll('.edit-branch-btn')
    for (const i of allEditBtn) {
        i.onclick = (a) => {
            addBranchBtn.onclick = async (e) => {
                addBranchInput.style.borderColor = '#dee2e6'
                if(!addBranchInput.value){
                    addBranchInput.style.borderColor = 'red'
                } else {
                    const res = await fetch(`/api/branch/${a.target.dataset.id}`, {
                        method: 'PATCH',
                        headers: {
                            'Content-type': 'application/json'
                        },
                        body: JSON.stringify({
                            branchName: addBranchInput.value
                        })
                    })
                    const data = await res.json()
                    if(data.status == 201){
                        alertTitle.textContent = `Mu'vaffaqiyat tahrirlandi`
                        alertDescripsion.textContent = `filial nomi mu'vaffaqiyat tahrirlandi`
                        alertModal.classList.remove('display_none')
                        addBranchInput.value = ''
                        alertClose(200)
                    } else if(data.status == 403){
                        alertTitle.textContent = `Xatolik`
                        alertDescripsion.textContent = `Bu filial qo'shilgan !`
                        alertModal.classList.remove('display_none')
                        alertClose(403)
                    } else if(data.status == 404){
                        alertTitle.textContent = `Xatolik`
                        alertDescripsion.textContent = `Bunday filial topilmadi !`
                        alertModal.classList.remove('display_none')
                        alertClose(404)
                    }
                }
            }
        }
    }
}

async function getBranches(){
    const res = await fetch('/api/branch')
    const data = await res.json()
    
    let counterId = 0
    for (const i of data) {
        counterId += 1
        const tr = document.createElement('tr')
        const id = document.createElement('td')
        const name = document.createElement('td')
        const date = document.createElement('td')
        const endWrapper = document.createElement('td')
        const editLink = document.createElement('a')
        const editIcon = document.createElement('i')
        
        tr.role = 'row'
        tr.classList.add('odd')
        
        id.classList.add('sorting_1')
        endWrapper.classList.add('text-end')
        editLink.classList.add('edit-branch-btn','btn', 'btn-sm', 'btn-white', 'text-success', 'me-2')
        editIcon.classList.add('far', 'fa-edit', 'me-1')
        editLink.setAttribute('data-bs-toggle', 'modal')
        editLink.setAttribute('data-bs-target', '#add_items')
        // data-bs-toggle="modal" data-bs-target="#add_items"
        
        
        
        editLink.dataset.id = i.id
        
        id.textContent = '#'+counterId
        name.textContent = i.branchName
        date.textContent = i.createdAt.split('T')[0]
        editLink.append(editIcon)
        editLink.innerHTML = ' Tahrirlash'
        endWrapper.appendChild(editLink)
        
        tr.appendChild(id)
        tr.appendChild(name)
        tr.appendChild(date)
        tr.appendChild(endWrapper)
        wrapper.appendChild(tr)
    }
    
    editBranch()
}
getBranches()

addBranchBtn.onclick = async (e) => {
    addBranchInput.style.borderColor = '#dee2e6'
    if(!addBranchInput.value){
        addBranchInput.style.borderColor = 'red'
    } else {
        const res = await fetch('/api/branch', {
            method: 'POST',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify({
                branchName: addBranchInput.value
            })
        })
        const data = await res.json()
        if(data.status == 201){
            alertTitle.textContent = `Mu'vaffaqiyat qo'shildi`
            alertDescripsion.textContent = `Yangi filial mu'vaffaqiyat qo'shildi`
            alertModal.classList.remove('display_none')
            addBranchInput.value = ''
            alertClose(200)
        } else if(data.status == 403){
            alertTitle.textContent = `Xatolik`
            alertDescripsion.textContent = `Bu filial qo'shilgan !`
            alertModal.classList.remove('display_none')
            alertClose(403)
        }
    }
}