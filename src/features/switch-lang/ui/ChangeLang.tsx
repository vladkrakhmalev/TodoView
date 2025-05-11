import { FC } from 'react'
import './ChangeLang.css'
import { Dialog } from '@shared/ui/dialog'
import { Button } from '@shared/ui/button'
import { useLang, DEFAULT_LANG, LANGS } from '@shared/config/i18n'

export const ChangeLang: FC = () => {
  const { activeLang, toggleLang } = useLang()

  return (
    <Dialog
      trigger={
        <Button iconAfter='angle-small-down'>
          {activeLang?.title || DEFAULT_LANG.title}
        </Button>
      }
    >
      <div className='сhange-lang__container'>
        {LANGS.map(lang => (
          <Button key={lang.value} onClick={() => toggleLang(lang.value)}>
            {lang.title}
          </Button>
        ))}
      </div>
    </Dialog>
  )
}
