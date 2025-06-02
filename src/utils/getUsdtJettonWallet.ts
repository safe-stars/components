import { Address, beginCell } from "@ton/core";
import { TonClient } from "@ton/ton";
import { USDT_ADDRESS } from "./addresses";

export const getUsdtJettonWallet = async (tonClient: TonClient, address: string) => {
	const jettonWallet = await tonClient.runMethod(
		Address.parse(USDT_ADDRESS.TON),
		'get_wallet_address',
		[{ type: 'slice', cell: beginCell().storeAddress(Address.parse(address)).endCell() }]
	);
	return jettonWallet.stack.readCell().beginParse().loadAddress();
};

