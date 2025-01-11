import { useState, useRef } from "react"
import "./SearchBar.css"
// робим функцію SearchBar, яка відповідає за пошук
export function SearchBar(){
    // робим стан для управління відкриттям/закриттям модального вікна.
    // isModalOpen зберігає поточний стан (true- відкрите, false- закрите)
    // setIsModalOpened змінює цей стан
    const [isModalOpen, setIsModalOpened] = useState <boolean>(false)

    // функція, яка викликається при фокусі на полі вводу
    function inputOnFocus(){
        // змінюм стан 'isModalOpen' на 'true', відкриваючи модальне вікно
        setIsModalOpened(true)
        
    }
    // додаємо обробник події "click" до документа(документ- це усі елементи сторінки хтмл)
    // обробник закриває модальне вікно, якщо юзер клацає за межами 
    // модального вікна (modalRef) і поля вводу (inputRef)
    document.addEventListener("click", (event)=>{
        // виводім в консоль елемент на котрий клікнулі
        console.log(event.target)
        // виводім в консоль посилання на модальне вікно
        console.log(modalRef.current)

        // провєряєм, чи клік був не по модальному вікну і не по полю вводу
        if (modalRef.current !== event.target && event.target !== inputRef.current){
            // змінюм стан 'isModalOpen' на 'false', закриваючи модальне вікно
            setIsModalOpened(false)
        }
    })  
    // робим змінну modalRef з посиланням на HTML-елемент <div>, яке може бути null.
    const modalRef = useRef<HTMLDivElement | null>(null);
    // робим змінну inputRef з посиланням на HTML-елемент <input]>, яке може бути null.
    const inputRef = useRef<HTMLInputElement | null>(null);

    return(
        <div>
             <input className="input"
              type="text"
            // прив’язка посилання до елемента <input
              ref={inputRef}
              placeholder="Пошук продуктів..." 
              // викликається функція 'inputOnFocus', коли поле отримує фокус.
              onFocus={inputOnFocus}/> 
              {/* провєрка, якщо модалка відкрита, то */}
             { isModalOpen === true 
                    ? 
                    // якшо умова виконується, рендериться <div>
                    <div ref={modalRef}>
                        <button>opened</button>
                    </div>
                    : 
                    // іначе нічо не рендериться(((
                    undefined
            }

        </div>
    )
}