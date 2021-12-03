import React from 'react'
import { Text, Box } from '@pangolindex/components'
import { useTranslation } from 'react-i18next'
import { Wrapper, IconWrapper, Icon, Link } from './styled'
import appStore from '../../assets/svg/social/appStore.svg'
import Discord from '../../assets/svg/social/discord.svg'
import Github from '../../assets/svg/social/github.svg'
import Medium from '../../assets/svg/social/medium.svg'
import playStore from '../../assets/svg/social/playStore.svg'
import Substack from '../../assets/svg/social/substack.svg'
import Telegram from '../../assets/svg/social/telegram.svg'
import Twitter from '../../assets/svg/social/twitter.svg'
import Youtube from '../../assets/svg/social/youtube.svg'

interface SocialMediaProps {
  collapsed: boolean
}

export default function SocialMedia({ collapsed }: SocialMediaProps) {
  const { t } = useTranslation()

  const socialLinks = [
    {
      link: 'http://www.w3.org/2000/svg',
      icon: appStore,
      title: 'appStore'
    },
    {
      link: 'https://twitter.com/pangolindex',
      icon: Twitter,
      title: 'Twitter'
    },
    {
      link: 'https://t.me/pangolindex',
      icon: Telegram,
      title: 'Telegram'
    },
    {
      link: 'https://www.youtube.com/channel/UClJJTG4FRL4z3AOf-ZWXZLw',
      icon: Youtube,
      title: 'Youtube'
    },
    {
      link: 'https://pangolindex.medium.com/',
      icon: Medium,
      title: 'Medium'
    },
    {
      link: 'http://www.w3.org/2000/svg',
      icon: Medium,
      title: 'playStore'
    },
    {
      link: 'https://github.com/pangolindex',
      icon: Github,
      title: 'Github'
    },
    {
      link: 'https://discord.gg/PARrDYYbfw',
      icon: Discord,
      title: 'Discord'
    },
    {
      link: 'https://pangolin.substack.com/',
      icon: Substack,
      title: 'Substack'
    }
  ]

  return (
    <Wrapper>
      {collapsed && (
        <Box textAlign="center">
          <Text fontSize={12} color="text4">
            {t('header.comeAndJoinUs')}
          </Text>
        </Box>
      )}

      <IconWrapper collapsed={collapsed}>
        {socialLinks.map((x, index) => {
          return (
            <Link key={index} href={x.link}>
              <Icon height={'16px'} src={x.icon} alt={x.title} />
            </Link>
          )
        })}
      </IconWrapper>

      {collapsed && (
        <Box display="inline-flex" justifyContent="space-between" alignItems="center">
          <img height={'28px'} src={appStore} alt={'appStore'} />
          <img height={'28px'} src={Discord} alt={'discord'} />
          <img height={'28px'} src={Github} alt={'Github'} />
          <img height={'28px'} src={Medium} alt={'medium'} />
          <img height={'28px'} src={playStore} alt={'playStore'} />
          <img height={'28px'} src={Substack} alt={'Substack'} />
          <img height={'28px'} src={Telegram} alt={'Telegram'} />
          <img height={'28px'} src={Twitter} alt={'twitter'} />
          <img height={'28px'} src={Youtube} alt={'youtobe'} />
        </Box>
      )}
    </Wrapper>
  )
}
