import {
	Button,
	NavBar,
	Slider,
	Toast,
	Popup,
	Field,
	Swipe,
	SwipeItem,
	Tab,
	Tabs,
	Icon,
	Loading,
	NoticeBar,
	Dialog,
	Picker,
	Cell,
	CellGroup,
	RadioGroup,
	Radio,
	CountDown,
	List,
	Collapse,
	CollapseItem,
	Skeleton,
	Empty,
	Row,
	Col,
	AddressEdit,
	Area
} from 'vant'

const components = {
	Button,
	NavBar,
	Slider,
	Toast,
	Popup,
	Field,
	Swipe,
	SwipeItem,
	Tab,
	Tabs,
	Icon,
	Loading,
	NoticeBar,
	Dialog,
	Picker,
	Cell,
	CellGroup,
	RadioGroup,
	Radio,
	CountDown,
	List,
	Collapse,
	CollapseItem,
	Skeleton,
	Empty,
	Row,
	Col,
	AddressEdit,
	Area
}

function install(Vue) {
	Object.keys(components).forEach(key => Vue.use(components[key]))
}
export default {
	install
}
