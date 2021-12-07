import React, { useRef } from 'react'
import { MessageCircle, Twitter } from 'react-feather'
import styled from 'styled-components'
import { useOnClickOutside } from '../../hooks/useOnClickOutside'
import { ApplicationModal } from '../../state/application/actions'
import { useModalOpen, useToggleModal } from '../../state/application/hooks'

import { StyledMenu, StyledMenuButton, MenuFlyout, MenuItem} from '../StyledMenu'

import { useTranslation } from 'react-i18next'

const NarrowMenuFlyout = styled(MenuFlyout)`
  min-width: 8.125rem;
  ${({ theme }) => theme.mediaWidth.upToMedium`
    top: -17.25rem;
  `};
`

export default function Menu() {
  const node = useRef<HTMLDivElement>()
  const open = useModalOpen(ApplicationModal.MENU)
  const toggle = useToggleModal(ApplicationModal.MENU)
  const { t } = useTranslation()
  useOnClickOutside(node, open ? toggle : undefined)

  return (
    // https://github.com/DefinitelyTyped/DefinitelyTyped/issues/30451
    <StyledMenu ref={node as any}>
      <StyledMenuButton onClick={toggle}>
        Social
      </StyledMenuButton>

      {open && (
        <NarrowMenuFlyout>
          <MenuItem id="link" href="https://discord.com/invite/BSsN6tn3YC">
            <MessageCircle size={14} />
            {t('menu.discord')}
          </MenuItem>
          <MenuItem id="link" href="https://twitter.com/DaoLambda">
            <Twitter size={14} />
            {t('menu.twitter')}
          </MenuItem>
          {/* <MenuNavItem id="link" to={'/IDO'}>
            <Calendar size={14} />
            {t('menu.idos')}
          </MenuNavItem> */}
          {/* <MenuItem id="link" href={TutorialPage}>
            <Book size={14} />
            {t('menu.tutorials')}
          </MenuItem> */}
          {/* <MenuItem id="link" href="https://github.com/pangolindex">
            <GitHub size={14} />
            {t('menu.code')}
          </MenuItem> */}
        </NarrowMenuFlyout>
      )}
    </StyledMenu>
  )
}
