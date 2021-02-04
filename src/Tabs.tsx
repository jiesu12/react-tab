import * as React from 'react'
import './Tabs.scss'

export interface Tab {
  title: string
  component: (() => React.ReactNode) | React.ReactNode
  rerender?: boolean // if true, switch tab will re-redener component.
  titleRenderer?(
    title: string,
    isCurrent: boolean,
    setCurrentTitle: (title: string) => void
  ): React.ReactElement
}

interface Props {
  tabs: Tab[]
  currentTitle?: string // if not null, currentTitle will be controlled by parent,
  setCurrentTitle?(title: string): void // otherwise currentTitle is controlled by Tabs.
}

export default ({ tabs, currentTitle, setCurrentTitle }: Props) => {
  const [currentTitleLocal, setCurrentTitleLocal] = React.useState<string>(tabs[0].title)
  const currentTitleFinal = currentTitle === undefined ? currentTitleLocal : currentTitle

  const getNavLinkClass = (tab: Tab): string => {
    return `tab-title nav-link ${currentTitleFinal === tab.title ? 'active' : ''}`
  }

  const renderComponent = (tab: Tab) => {
    const child: React.ReactNode =
      typeof tab.component === 'function' ? tab.component() : tab.component
    if (tab.rerender) {
      if (tab.title === currentTitleFinal) {
        return (
          <div key={tab.title} className='tab-component'>
            {child}
          </div>
        )
      } else {
        return null
      }
    } else {
      return (
        <div
          key={tab.title}
          className={`tab-component ${currentTitleFinal === tab.title ? 'show' : 'hide'}`}
        >
          {child}
        </div>
      )
    }
  }

  const setCurrentTitleEitherWay = (title: string) => {
    setCurrentTitle ? setCurrentTitle(title) : setCurrentTitleLocal(title)
  }

  const renderTitle = (tab: Tab) => {
    if (tab.titleRenderer === undefined) {
      return (
        <a
          className={getNavLinkClass(tab)}
          onClick={(): void => {
            setCurrentTitleEitherWay(tab.title)
          }}
        >
          {tab.title}
        </a>
      )
    } else {
      return (
        <div className={getNavLinkClass(tab)}>
          {tab.titleRenderer(tab.title, currentTitle === tab.title, setCurrentTitleEitherWay)}
        </div>
      )
    }
  }

  return (
    <div className='tabs-base'>
      <ul className='nav nav-tabs'>
        {tabs.map((tab) => (
          <li className='nav-item' key={tab.title}>
            {renderTitle(tab)}
          </li>
        ))}
      </ul>
      <div className='tab-component-base'>{tabs.map((tab) => renderComponent(tab))}</div>
    </div>
  )
}
