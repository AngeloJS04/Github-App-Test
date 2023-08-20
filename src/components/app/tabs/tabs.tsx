import React, { ReactNode } from 'react'

const Tabs = ({ tabs }: { tabs: { name: string, component: ReactNode, icon: string }[] }) => {
    const [selected, setSelected] = React.useState(0);

    return (
        <React.Fragment>
            <div className=" tabs flex justify-center mb-3">
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