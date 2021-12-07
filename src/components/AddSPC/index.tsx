import React from 'react'
import { injected } from '../../connectors'
import { PNG } from '../../constants'
import { useActiveWeb3React } from '../../hooks'
import { TYPE } from '../../theme'
import { AutoColumn } from '../Column'
import { CardSection } from '../earn/styled'
import styled from "styled-components";
import { useTranslation } from 'react-i18next'



const AddPNG = styled.span`
  width: 100%;
  height: 100%;
  font-weight: 500;
  font-size: 32;
  padding: 12px 6px;
  align-items: center;
  text-align: center;
  background-color: ${({ theme }) => theme.bg3};
  background: radial-gradient(174.47% 188.91% at 1.84% 0%,#88b8ff 0%,#2519da 100%),#edeef2;
  border-radius: 12px;
  white-space: nowrap;
  cursor: pointer;

  :hover {
    opacity: 0.8;
  }
`

export default function AddSPC() {

    const { chainId } = useActiveWeb3React()
    const png = chainId ? PNG[chainId] : undefined
    const { t } = useTranslation()

    return (
            <CardSection gap="sm">
              <AutoColumn gap="md">
                <AddPNG onClick={() => {
                  injected.getProvider().then(provider => {
                    if (provider) {
                      provider.request({
                        method: 'wallet_watchAsset',
                        params: {
                          type: 'ERC20',
                          options: {
                            address: png?.address,
                            symbol: png?.symbol,
                            decimals: png?.decimals,
                            image: 'https://raw.githubusercontent.com/krypto-dev/lamda-token/main/token.png',
                          },
                        },
                      }).catch((error: any) => {
                        console.error(error)
                      })
                    }
                  });
                }
              }>
                  <TYPE.white color="white">{t('header.addMetamask')}</TYPE.white>
                </AddPNG>
              </AutoColumn>
            </CardSection>
    )
}
