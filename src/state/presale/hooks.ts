import { usePresaleContract } from '../../hooks/useContract'
import {JSBI } from '@pangolindex/sdk'
import { useSingleCallResult } from '../multicall/hooks'


export function useMinLimit() {
	const presaleContract = usePresaleContract()
	console.log('debug->presalecontract', presaleContract)
	const response = useSingleCallResult(presaleContract, 'minMiaLimit', [])
	console.log('debug->response',response);
	const result = response.result ? JSBI.BigInt(response.result?.[0]) : JSBI.BigInt(0)
	return result
}

export function useMaxLimit() {
	const presaleContract = usePresaleContract()
	const response = useSingleCallResult(presaleContract, 'maxMiaLimit', [])
	const result = response.result ? JSBI.BigInt(response.result?.[0]) : JSBI.BigInt(0)
	return result
}

export function useTokenPrice() {
	const presaleContract = usePresaleContract()
	const response = useSingleCallResult(presaleContract, 'tokenPrice', [])
	const result = response.result ? JSBI.BigInt(response.result?.[0]) : JSBI.BigInt(0)
	return result
}

export function useOpenStatus() {
	const presaleContract = usePresaleContract()
	const response = useSingleCallResult(presaleContract, 'isPresaleOpen', [])
	const result = response.result ? response.result?.[0] : false
	return result
}

export function useAllowedBuy(account: string | null | undefined): boolean {
	const presaleContract = usePresaleContract()
	const response = useSingleCallResult(presaleContract, 'whiteListed', [account ? account : undefined])
	const res = Boolean(account && !response.loading && response.result !== undefined && response.result[0] === true)
	return res
}
