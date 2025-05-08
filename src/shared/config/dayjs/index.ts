import dayjs from 'dayjs'
import isoWeek from 'dayjs/plugin/isoWeek'
import 'dayjs/locale/ru'
import utc from 'dayjs/plugin/utc'
import customParseFormat from 'dayjs/plugin/customParseFormat'

dayjs.extend(isoWeek)
dayjs.extend(utc)
dayjs.extend(customParseFormat)
dayjs.locale('ru')

export default dayjs
