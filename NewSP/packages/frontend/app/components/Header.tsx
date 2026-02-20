'use client'

// import { ConnectButton } from '@rainbow-me/rainbowkit'
// import { useAccount, useBalance } from 'wagmi'
import { Bell, Settings, Menu } from 'lucide-react'
import Link from 'next/link'

export default function Header() {
	// Wallet connection code removed

	return (
		<header className="border-b border-gray-800 bg-gray-900/50 backdrop-blur-xl">
			<div className="flex h-16 items-center justify-between px-6">
				<div className="flex items-center gap-4">
					<div className="flex items-center gap-4">
						<button className="relative p-2 text-gray-400 hover:text-white hover:bg-gray-800 rounded-lg transition-colors">
							<Bell size={20} />
							<span className="absolute top-1 right-1 w-2 h-2 bg-purple-600 rounded-full"></span>
						</button>

						<button className="p-2 text-gray-400 hover:text-white hover:bg-gray-800 rounded-lg transition-colors">
							<Settings size={20} />
						</button>
					</div>
													{account.balanceFormatted && (
														<span className="text-xs text-purple-200 hidden md:block">
															{parseFloat(account.balanceFormatted).toFixed(4)} {account.displayBalance?.split(' ')[1]}
														</span>
													)}
												</button>
											</div>
										)
									})()}
								</div>
							)
						}}
					</ConnectButton.Custom>
				</div>
			</div>
		</header>
	)
}