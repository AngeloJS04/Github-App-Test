import { TabI } from '@/interface/components/tab.interface';
import React from 'react';

const Tabs = ({ tabs }: { tabs: TabI[]}) => {
    const [selected, setSelected] = React.useState(0);

    return (
        <React.Fragment>
            <div className=" sm:tabs  flex justify-center mb-10 md:mb-3">
                {
                    tabs.map((tab, index) => (
                        <>
                            <a key={index} onClick={() => setSelected(index)}
                                className={` tab tab-bordered px-10  ${selected === index ? ' tab-active' : ''} `} >
                                <span className="material-icons mx-2">{tab.icon}</span>
                                {tab.name}
                            </a>
                        </>
                    ))
                }
            </div>
                {tabs[selected].component}
        </React.Fragment>
    )
}
export default Tabs