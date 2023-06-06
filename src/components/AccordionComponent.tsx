import '../styles/components/accordion.sass';

import {useAppSelector} from "../store";

import {Accordion, AccordionItem, AccordionItemButton, AccordionItemHeading, AccordionItemPanel} from "react-accessible-accordion";
import Moment from "react-moment";
import {DocumentData} from "firebase/firestore";

function AccordionComponent({items}: { items: DocumentData[] }) {
    const state = useAppSelector(state => state);

    const setHeight = (() => {
        const accordion = document.querySelector('.accordion')
        const panels = accordion?.querySelectorAll('.accordion__panel')

        if (panels) {
            panels.forEach((panel: any) => {
                const paragraphs = panel.querySelectorAll('p')
                let height: number = 0
                paragraphs.forEach((paragraph: HTMLParagraphElement) => {
                    let paragraphHeight = paragraph.offsetHeight
                    height += paragraphHeight
                })
                panel.style.height = `${height + 40}px`
            })
        }
    })

    const accordionClick = (id: string[]) => {
        const allItems = document.querySelectorAll(".accordion__item");
        for (const item of allItems) {
            item.classList.remove('open');
        }
        const openedPanel = document.getElementById(`accordion__heading-${id[0]}`);
        const accordionItem = openedPanel?.closest(".accordion__item");
        accordionItem?.classList.add('open');
    }

    return (
        <Accordion allowZeroExpanded onChange={(id: string[]) => accordionClick(id)}>
            {items.map(el => (
                el.date && <AccordionItem key={Math.random()}>
                    <AccordionItemHeading>
                        <AccordionItemButton>
                            <div className='accordion__wrap flex-x-between-y-center'>
                                <p className='section__text accordion__price'>Сумма заказа: <span className='text-color'>{el.sum} ₽</span></p>
                                <div className='accordion__date date flex'>
                                    <span className='section__text date__text'>Дата заказа: </span>
                                    <Moment className='section__text date__descr' format="YYYY-MM-DD HH:mm">{new Date(el.date.seconds * 1000)}</Moment>
                                </div>
                            </div>
                        </AccordionItemButton>
                    </AccordionItemHeading>
                    <AccordionItemPanel>
                        {el.items.map((elem: { id: number; count: number}) => (
                            <p className='accordion__panelItem panelItem' key={Math.random()} ref={setHeight}>
                                <span className='section__text panelItem__text'>{state.goods.map(element => element.id === elem.id ? element.title : null)}</span>
                                <span className='section__text panelItem__text'> x {elem.count}</span>
                            </p>
                        ))}
                    </AccordionItemPanel>
                </AccordionItem>
            ))}
        </Accordion>
    )
}

export default AccordionComponent