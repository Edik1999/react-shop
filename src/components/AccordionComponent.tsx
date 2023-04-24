import '../styles/components/accordion.sass';

import {useAppSelector} from "../store";

import {Accordion, AccordionItem, AccordionItemButton, AccordionItemHeading, AccordionItemPanel} from "react-accessible-accordion";
import Moment from "react-moment";

function AccordionComponent({items}: {items: object[]}) {

    const state = useAppSelector(state => state);

    const accordionClick = (id: any[]) => {
        const allItems = document.querySelectorAll(".accordion__item");
        for (const item of allItems) {
            item.classList.remove('open');
        }
        const openedPanel = document.getElementById(`accordion__heading-${id[0]}`);
        const accordionItem = openedPanel?.closest(".accordion__item");
        accordionItem?.classList.add('open');
    }

    const setHeight = () => {
        const accordion = document.querySelector('.accordion')
        const panels = accordion?.querySelectorAll('.accordion__panel')
        if (panels) {
            panels.forEach((panel: any) => {
                const paragraphs = panel.querySelectorAll('p')
                let height: number = 0
                paragraphs.forEach((paragraph: any) => {
                    let paragraphHeight = getComputedStyle(paragraph).height
                    paragraphHeight = paragraphHeight.replace(/[^0-9]/g, '');
                    height += Number(paragraphHeight)
                })
                panel.style.height = `${height + 40}px`
            })
        }
    }

    return (
        <Accordion allowZeroExpanded onChange={(id: any) => accordionClick(id)}>
            {items.map((el: any) => (
                el.date && <AccordionItem key={Math.random()}>
                    <AccordionItemHeading>
                        <AccordionItemButton>
                            <div className='accordion__wrap'>
                                <p className='section__text accordion-price'>Сумма заказа: <span className='text-color'>{el.sum} ₽</span></p>
                                <div className='accordion-date'>
                                    <span className='section__text date__text'>Дата заказа: </span>
                                    <Moment className='section__text date__descr' format="YYYY-MM-DD HH:mm">{new Date(el.date.seconds * 1000)}</Moment>
                                </div>
                            </div>
                        </AccordionItemButton>
                    </AccordionItemHeading>
                    <AccordionItemPanel>
                        {el.items.map((elem: any) => (
                            <p className='accordion-text' key={Math.random()} ref={(ref) => setHeight()}>
                                <span className='section__text'>{state.goods.map(element => element.id === elem.id ? element.title : null)}</span>
                                <span className='section__text'> x {elem.count}</span>
                            </p>
                        ))}
                    </AccordionItemPanel>
                </AccordionItem>
            ))}
        </Accordion>
    )
}

export default AccordionComponent