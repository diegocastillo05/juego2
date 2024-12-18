function allowDrop(event) {
    event.preventDefault();
}

function drag(event) {
    event.dataTransfer.setData("text", event.target.id);
    event.target.classList.add("dragging");
}

function dragend(event) {
    event.target.classList.remove("dragging");
}

const btncontinuar = document.querySelector("#continuar");
const btnvolver = document.querySelector("#volver");
const mensajeFinal = document.querySelector(".mensajeFinal"); // Referencia al contenedor del mensaje final

function drop(event) {
    event.preventDefault();
    const data = event.dataTransfer.getData("text");
    const draggedElement = document.getElementById(data);

    if (event.target.classList.contains('ContentItem')) {
        const existingItem = event.target.querySelector('.item');
        if (!existingItem) {
            event.target.appendChild(draggedElement);

            const draggedCard = draggedElement.getAttribute('data-card');
            const targetCard = event.target.getAttribute('data-card');

            if (draggedCard === targetCard) {
                event.target.classList.add('true');
                event.target.classList.remove('false');
            } else {
                event.target.classList.add('false');
                event.target.classList.remove('true');
            }
        } else {
            console.log("Este espacio ya tiene un ítem.");
        }

        const allContentItems = document.querySelectorAll('.ContentItem');
        allContentItems.forEach(item => item.classList.remove('active'));
        event.target.classList.add('active');
    }

    const allTrue = document.querySelectorAll('.ContentItem.true').length === document.querySelectorAll('.ContentItem').length;

    if (allTrue) {
        btncontinuar.classList.add('active');
        btnvolver.classList.remove('active');
        mensajeFinal.classList.add('active'); // Mostrar mensaje final
    } else {
        btncontinuar.classList.remove('active');
        btnvolver.classList.add('active');
        mensajeFinal.classList.remove('active'); // Ocultar mensaje final
    }
}

document.getElementById('volver').addEventListener('click', function () {
    const items = document.querySelectorAll('.item');
    const originalContainer = document.querySelector('.items');

    const allContentItems = document.querySelectorAll('.ContentItem');
    allContentItems.forEach(item => {
        const draggedItem = item.querySelector('.item');
        if (draggedItem) {
            originalContainer.appendChild(draggedItem);
        }
        item.classList.remove('active', 'true', 'false');
    });

    btncontinuar.classList.remove('active');
    btnvolver.classList.add('active');
    mensajeFinal.classList.remove('active'); // Reiniciar mensaje final
});
