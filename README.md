# React Tabs

### Let Tabs Control What Tab Should Be Active

```
const TABS: Tab[] = [
  {
    title: 'Tab one',
    component: <div />,
    rerender: false,
  },
  {
    title: 'Tab two',
    component: <div />,
    rerender: false,
  },
]
<Tabs tabs={TABS} />
```

### Let Parent Control What Tab Should Be Active

```
const TABS: Tab[] = [
  {
    title: 'Tab one',
    component: <div />,
    rerender: false,
  },
  {
    title: 'Tab two',
    component: <div />,
    rerender: false,
  },
]
const [activeTabTitle, setActiveTabTitle] = useState<string>('Tab one')
<Tabs
  tabs={TABS}
  currentTitle={activeTabTitle}
  setCurrentTitle={(title) => setActiveTabTitle(title)}
/>
```

### Release

- run `npm login` if not logged in yet.
- Update version in `package.json`
- run `npm run build`
- run `npm publish --access public`
