import dayjs from 'dayjs'
import isoWeek from 'dayjs/plugin/isoWeek'
import 'dayjs/locale/ru'
import 'dayjs/locale/en'
import utc from 'dayjs/plugin/utc'
import customParseFormat from 'dayjs/plugin/customParseFormat'
import i18n from '@shared/config/i18n'

dayjs.extend(isoWeek)
dayjs.extend(utc)
dayjs.extend(customParseFormat)
dayjs.locale(i18n.language)

export default dayjs
