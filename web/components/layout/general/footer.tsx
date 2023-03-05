import React from 'react'

import classNames from 'clsx'
import { FaGithub, FaTwitter } from 'react-icons/fa'

import { siteConfig } from '@/config/site'

import { LinkComponent } from '../../shared/link-component'

interface Props {
  className?: string
}

export function Footer(props: Props) {
  const classes = classNames(props.className, 'Footer', 'px-4 py-6 flex flex-col justify-center items-center')

  return (
    <footer className={classes}>
      <h3>{siteConfig.title}</h3>
      <p className="my-2 text-xs">Built by artem0x.eth, gold0x.eth, and cipherz.eth</p>
      <div className="mt-2 flex items-center">
        <LinkComponent href={`${siteConfig.links.github}`}>
          <FaGithub />
        </LinkComponent>
      </div>
    </footer>
  )
}
