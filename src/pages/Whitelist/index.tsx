import React, { useState, /* useCallback */ } from 'react'
import AppBody from "../AppBody"
import styled from "styled-components";
import {Wrapper} from "../../components/swap/styleds"
import { darken } from 'polished'
import { RowBetween } from '../../components/Row'
import PurchaseForm, {Data } from "../../components/PurchaseForm"
import { ButtonPrimary, ButtonSecondary } from "../../components/Button"
import { Link } from '../../layout/SocialMedia/styled'
import { useMinLimit, useMaxLimit, useTokenPrice, useOpenStatus, useAllowedBuy } from '../../state/presale/hooks'
import {useActiveWeb3React} from "../../hooks";
import { usePresaleContract } from '../../hooks/useContract'
import { useTranslation } from 'react-i18next'
import { Text } from 'rebass'
import Web3Status from '../../components/Web3Status'
import { Dots } from '../../components/swap/styleds'
import { useApproveCallback, ApprovalState } from '../../hooks/useApproveCallback'
import { TokenAmount, JSBI } from '@pangolindex/sdk'
import { useTokenBalance } from '../../state/wallet/hooks'
import { Input as NumericalInput } from '../../components/NumericalInput'
import { MIM } from './../../constants/index'
import AddSPC from "../../components/AddSPC";
import { tryParseAmount } from '../../state/swap/hooks'
import { TransactionResponse } from '@ethersproject/providers'
import { useTransactionAdder } from '../../state/transactions/hooks'
import { PRESALE_ADDRESS } from '../../constants'

const FormInner = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  border: 1px solid rgb(86, 90, 105);
  padding: 16px 12px;
  border-radius: 12px;
`;

const StyledBalanceMax = styled.button`
  height: 48px;
  background-color: ${({ theme }) => theme.primary1};
  border: 1px solid ${({ theme }) => theme.primary6};
  border-radius: 0.5rem;
  font-size: 0.875rem;
  font-weight: 500;
  cursor: pointer;
  margin-right: 0.5rem;
  color: ${({ theme }) => theme.primaryText1};
  :hover {
    border: 1px solid ${({ theme }) => theme.primary1};
  }
  :focus {
    border: 1px solid ${({ theme }) => theme.primary1};
    outline: none;
  }
  ${({ theme }) => theme.mediaWidth.upToExtraSmall`
    margin-right: 0.5rem;
  `};
`

const StyledInput = styled.div`
  display: flex;
  -webkit-box-align: center;
  align-items: center;
  width: 100%;
  overflow: hidden;
  border-radius: 12px;
  font-weight: 500;
  transition: all 0.2s ease 0s;
  margin-bottom: 20px;
`;

const ContactLink = styled(Link)`
  -webkit-box-align: center;
  align-items: center;
  justify-content: center;
  padding: 13px;
  margin-top: 10px;
  border-radius: 13px;
  background: radial-gradient(174.47% 188.91% at 1.84% 0%,#88b8ff 0%,#2519da 100%),#edeef2;
  color: white;
  &:focus {
    box-shadow: 0 0 0 1pt ${({ theme }) => darken(0.05, theme.primary1)};
    background-color: ${({ theme }) => darken(0.05, theme.primary1)};
  }
  &:hover {
    background-color: ${({ theme }) => darken(0.05, theme.primary1)};
  }
  &:active {
    box-shadow: 0 0 0 1pt ${({ theme }) => darken(0.1, theme.primary1)};
    background-color: ${({ theme }) => darken(0.1, theme.primary1)};
  }
`;


export default function Whitelist() {

  const { account } = useActiveWeb3React()

  const { t } = useTranslation()
  const [amount, setAmount] = useState('')
  const minMimLimit = useMinLimit()
  const maxMimLimit = useMaxLimit()
  const tokenPrice = useTokenPrice()
  const isOpen = useOpenStatus()
  console.log('debug->isOpen', isOpen)
  const isAllowed = useAllowedBuy(account)
  console.log('debug->isAllowed', isAllowed)
  const mim = MIM[137]
  const userMimAmount = useTokenBalance(account ?? undefined, mim)
  const mimBalance = userMimAmount ? Number(userMimAmount.toExact()) : 0
  const isInsufficent = Number(amount) > mimBalance
  const goodtosee = (nstring: string) => {
    return Number(nstring)/(10 ** 18)
  }
  const isLimited = Number(amount) < goodtosee(minMimLimit.toString()) || Number(amount) > goodtosee(maxMimLimit.toString())
  const handleSubmit = (data: Data) => {
    console.log(true);
  }

  const onMax = () => {
    goodtosee(maxMimLimit.toString()) > 0 ?
    setAmount(goodtosee(maxMimLimit.toString()).toString()) :
    setAmount('800')
  }

  
	const mimAmount = new TokenAmount(mim, JSBI.BigInt(2*256-1))
  const addTransaction = useTransactionAdder()
  const [attempting, setAttempting] = useState<boolean>(false)
  const [hash, setHash] = useState<string | undefined>()
  const [approval, approveCallback] = useApproveCallback(mimAmount, PRESALE_ADDRESS)
  const presaleContract = usePresaleContract()
  const parsedAmount = tryParseAmount(amount, mim)

  async function onBuy() {
    if (presaleContract && parsedAmount) {
      setAttempting(true)
      const method = 'buy'
      const args = [`0x${parsedAmount.raw.toString(16)}`]
      if (approval === ApprovalState.APPROVED) {
        presaleContract
          [method](...args)
          .then((response: TransactionResponse) => {
            addTransaction(response, {
              summary: t("Registered successfully")
            });
            setHash(response.hash);
            setAttempting(false);
          })
          .catch((error: any) => {
            setAttempting(false);
            console.error(error);
          })
      } else {
        setAttempting(false)
        throw new Error(t('Something went wrong'))
      }
    }
  }

  return (
    <>
      <AppBody>
        <Wrapper id="normal-page">
          <PurchaseForm onSubmit={handleSubmit}>
            <FormInner>
              { isOpen ? 
                <>
                </>
                :
                <Text fontSize="18px" textAlign="center" mb="20px">{t('PreSale is not started yet')}</Text>
              }
              <Text fontSize="18px" textAlign="center" mb="20px">{t('Enter the amount you want to participate (MAI)')}</Text>
              <Text fontSize="18px" textAlign="center" mb="20px">The minimum amount is {goodtosee(minMimLimit.toString())} $MAI</Text>
              <Text fontSize="18px" textAlign="center" mb="20px">The maximum amount is {goodtosee(maxMimLimit.toString())} $MAI</Text>
              <Text fontSize="18px" textAlign="center" mb="20px">1 MAI = {goodtosee(tokenPrice.toString())} $LMDA</Text>
              { isOpen ? 
                <>
                  <StyledInput>
                    <NumericalInput className="token-amount-input" value={amount} onUserInput={setAmount}/>          
                    <StyledBalanceMax onClick={onMax}>{t('Max')}</StyledBalanceMax>
                  </StyledInput>
                  { account ? 
                    ( isAllowed ?
                      <RowBetween>
                        {approval !== ApprovalState.APPROVED && (
                          <ButtonPrimary
                            onClick={approveCallback}
                            disabled={approval === ApprovalState.PENDING}
                            width='100%'
                          >
                            {approval === ApprovalState.PENDING ? (
                              <Dots>Approving MIA</Dots>
                            ) : (
                              t('Approve MIA')
                            )}
                          </ButtonPrimary>
                        )}
                        {approval === ApprovalState.APPROVED && (
                          !isInsufficent && !isLimited ?
                          <ButtonPrimary
                            onClick={onBuy}
                            disabled={attempting && !hash}
                            width='100%'
                          >
                            {attempting ? (
                              <Dots>Buying LMDA-Token</Dots>
                            ) : (
                              t('Buy')
                            )}
                          </ButtonPrimary>
                          :
                          <ButtonSecondary
                            width='100%'
                          > 
                              {amount === '' ? t('Enter Amount') : isInsufficent ? t('Insufficent Balance') : t('Exceed Limited Amount')}
                          </ButtonSecondary>
                        )}
                      </RowBetween>
                    :
                    <>
                      <Text fontSize="15px" textAlign="center" mt="20px" color="#00fffe">{t('You are not allowed to buy')}</Text>
                      <ContactLink  href="https://t.me/spicycoin">
                        {t('Contact Support')}
                      </ContactLink>
                    </>
                    ) :
                    <Web3Status />
                  }
                </>
                :
                <></>
              }
            </FormInner>
          </PurchaseForm>
          <AddSPC />
        </Wrapper>
      </AppBody>
    </>
    )
}
