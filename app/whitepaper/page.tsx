import { Card, CardContent } from "@/components/ui/card"

export default function WhitepaperPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-6 pb-0 mobile-scrollable">
  

      {/* Content Section */}
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          {/* Index */}
          <section className="mb-12" id="index">
            <h2 className="text-3xl font-bold mb-6 text-[rgb(var(--dark-text-primary))] glow-text text-center">
              Index
            </h2>
            <Card className="dark-card">
              <CardContent className="p-6">
                <ul className="space-y-2 text-[rgb(var(--dark-text-secondary))]">
                  <li>
                    <a href="#abstract" className="hover:text-[rgb(var(--dark-accent))] transition-colors">
                      Abstract
                    </a>
                  </li>
                  <li>
                    <a href="#project-background" className="hover:text-[rgb(var(--dark-accent))] transition-colors">
                      1. Project Background Overview
                    </a>
                    <ul className="pl-6 space-y-1 mt-1">
                      <li>
                        <a href="#rise-of-defi" className="hover:text-[rgb(var(--dark-accent))] transition-colors">
                          1.1 The Rise of Decentralized Finance (DeFi)
                        </a>
                      </li>
                      <li>
                        <a
                          href="#evolution-yield-farming"
                          className="hover:text-[rgb(var(--dark-accent))] transition-colors"
                        >
                          1.2 The Evolution of Yield Farming
                        </a>
                      </li>
                      <li>
                        <a href="#vision-usdc" className="hover:text-[rgb(var(--dark-accent))] transition-colors">
                          1.3 The Vision of USDC Liquidity Farming
                        </a>
                      </li>
                      <li>
                        <a href="#project-goals" className="hover:text-[rgb(var(--dark-accent))] transition-colors">
                          1.4 Project Goals
                        </a>
                      </li>
                    </ul>
                  </li>
                  <li>
                    <a href="#issues-traditional" className="hover:text-[rgb(var(--dark-accent))] transition-colors">
                      2. Issues with Traditional Yield Farming
                    </a>
                    <ul className="pl-6 space-y-1 mt-1">
                      <li>
                        <a href="#high-risk" className="hover:text-[rgb(var(--dark-accent))] transition-colors">
                          2.1 High Risk and Impermanent Loss
                        </a>
                      </li>
                      <li>
                        <a href="#lock-up" className="hover:text-[rgb(var(--dark-accent))] transition-colors">
                          2.2 Lock-Up Periods
                        </a>
                      </li>
                      <li>
                        <a href="#complexity" className="hover:text-[rgb(var(--dark-accent))] transition-colors">
                          2.3 Complexity and Technical Barriers
                        </a>
                      </li>
                      <li>
                        <a
                          href="#smart-contract-risks"
                          className="hover:text-[rgb(var(--dark-accent))] transition-colors"
                        >
                          2.4 Smart Contract and Systemic Risks
                        </a>
                      </li>
                      <li>
                        <a href="#unstable-yields" className="hover:text-[rgb(var(--dark-accent))] transition-colors">
                          2.5 Unstable Yields
                        </a>
                      </li>
                    </ul>
                  </li>
                  <li>
                    <a href="#usdc-overview" className="hover:text-[rgb(var(--dark-accent))] transition-colors">
                      3. USDC Liquidity Farming Overview
                    </a>
                    <ul className="pl-6 space-y-1 mt-1">
                      <li>
                        <a href="#core-concept" className="hover:text-[rgb(var(--dark-accent))] transition-colors">
                          3.1 Core Concept
                        </a>
                      </li>
                      <li>
                        <a href="#mechanism" className="hover:text-[rgb(var(--dark-accent))] transition-colors">
                          3.2 Mechanism
                        </a>
                      </li>
                      <li>
                        <a href="#advantages" className="hover:text-[rgb(var(--dark-accent))] transition-colors">
                          3.3 Advantages
                        </a>
                      </li>
                      <li>
                        <a href="#comparison" className="hover:text-[rgb(var(--dark-accent))] transition-colors">
                          3.4 Comparison with Traditional Farming
                        </a>
                      </li>
                    </ul>
                  </li>
                  <li>
                    <a
                      href="#technical-architecture"
                      className="hover:text-[rgb(var(--dark-accent))] transition-colors"
                    >
                      4. Technical Architecture
                    </a>
                    <ul className="pl-6 space-y-1 mt-1">
                      <li>
                        <a
                          href="#blockchain-foundation"
                          className="hover:text-[rgb(var(--dark-accent))] transition-colors"
                        >
                          4.1 Blockchain Foundation
                        </a>
                      </li>
                      <li>
                        <a
                          href="#smart-contract-design"
                          className="hover:text-[rgb(var(--dark-accent))] transition-colors"
                        >
                          4.2 Smart Contract Design
                        </a>
                      </li>
                      <li>
                        <a href="#yield-strategies" className="hover:text-[rgb(var(--dark-accent))] transition-colors">
                          4.3 Yield Strategies
                        </a>
                      </li>
                    </ul>
                  </li>
                  <li>
                    <a href="#conclusion" className="hover:text-[rgb(var(--dark-accent))] transition-colors">
                      5. Conclusion
                    </a>
                    <ul className="pl-6 space-y-1 mt-1">
                      <li>
                        <a href="#project-value" className="hover:text-[rgb(var(--dark-accent))] transition-colors">
                          5.1 Project Value
                        </a>
                      </li>
                      <li>
                        <a href="#future-outlook" className="hover:text-[rgb(var(--dark-accent))] transition-colors">
                          5.2 Future Outlook
                        </a>
                      </li>
                      <li>
                        <a href="#crypto-asset" className="hover:text-[rgb(var(--dark-accent))] transition-colors">
                          5.3 Crypto Asset Trading System
                        </a>
                      </li>
                      <li>
                        <a href="#defi-mining" className="hover:text-[rgb(var(--dark-accent))] transition-colors">
                          5.4 DeFi Mining financial platform
                        </a>
                      </li>
                    </ul>
                  </li>
                  <li>
                    <a href="#arbitrage-rules" className="hover:text-[rgb(var(--dark-accent))] transition-colors">
                      6. Arbitrage Rules
                    </a>
                  </li>
                  <li>
                    <a href="#mining-pool-rules" className="hover:text-[rgb(var(--dark-accent))] transition-colors">
                      7. Liquidity Mining Pool Rules
                    </a>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </section>

          {/* Abstract */}
          <section className="mb-12" id="abstract">
            <h2 className="text-3xl font-bold mb-6 text-[rgb(var(--dark-text-primary))] glow-text text-center">
              Abstract
            </h2>
            <Card className="dark-card">
              <CardContent className="p-6 text-[rgb(var(--dark-text-secondary))]">
                <p>
                  USDC Liquidity Farming is an innovative decentralized finance (DeFi) yield farming model designed to
                  provide users with a non-custodial, low-risk, and highly liquid way to earn yields. Unlike traditional
                  Yield Farming, this project does not require users to deposit assets into the platform or lock funds.
                  Instead, users retain USDC in their own wallets, and the platform interacts with external protocols
                  via smart contracts to generate yields, which are directly returned to the user's wallet.
                </p>
                <p className="mt-4">
                  The platform employs diversified strategies (such as lending, stablecoin pool optimization, and
                  cross-pool arbitrage) to provide users with stable and predictable returns. Users maintain full
                  control over their assets and can withdraw funds at any time, ensuring liquidity and security. This
                  project aims to promote the democratization of DeFi, with a goal of achieving $100 million in Total
                  Value Locked (TVL) and 500,000 active users by 2025, becoming a benchmark in the stable yield sector.
                </p>
              </CardContent>
            </Card>
          </section>

          {/* 1. Project Background */}
          <section className="mb-12" id="project-background">
            <h2 className="text-3xl font-bold mb-6 text-[rgb(var(--dark-text-primary))] glow-text text-center">
              1. Project Background
            </h2>

            {/* 1.1 The Rise of Decentralized Finance (DeFi) */}
            <div className="mb-8" id="rise-of-defi">
              <h3 className="text-2xl font-semibold mb-4 text-[rgb(var(--dark-text-primary))]">
                1.1 The Rise of Decentralized Finance (DeFi)
              </h3>
              <Card className="dark-card">
                <CardContent className="p-6 text-[rgb(var(--dark-text-secondary))]">
                  <p>
                    Since the emergence of Ethereum's smart contract ecosystem in 2017, decentralized finance (DeFi) has
                    become one of the most revolutionary applications of blockchain technology. By eliminating
                    traditional financial intermediaries (such as banks and brokers), DeFi provides global users with
                    open, transparent, and permissionless financial services.
                  </p>
                  <p className="mt-4">
                    As of March 2025, the total value locked (TVL) in the DeFi ecosystem has exceeded $100 billion,
                    covering areas such as lending, trading, derivatives, and yield farming. The core of DeFi lies in
                    leveraging blockchain and smart contracts to enable automated and efficient financial operations
                    while giving users full control over their assets.
                  </p>
                </CardContent>
              </Card>
            </div>

            {/* 1.2 The Evolution of Yield Farming */}
            <div className="mb-8" id="evolution-yield-farming">
              <h3 className="text-2xl font-semibold mb-4 text-[rgb(var(--dark-text-primary))]">
                1.2 The Evolution of Yield Farming
              </h3>
              <Card className="dark-card">
                <CardContent className="p-6 text-[rgb(var(--dark-text-secondary))]">
                  <p>
                    Yield Farming, one of the core mechanisms of DeFi, was first introduced by Compound in 2020,
                    distributing governance tokens to liquidity providers as incentives. Subsequently, projects like
                    Uniswap and Curve further advanced this model.
                  </p>
                  <p className="mt-4">
                    However, traditional Yield Farming typically requires users to stake assets (such as ETH or other
                    tokens) into liquidity pools to earn returns. While this model offers high yields, it also comes
                    with significant risks, including impermanent loss, smart contract vulnerabilities, and market
                    volatility.
                  </p>
                </CardContent>
              </Card>
            </div>

            {/* 1.3 The Vision of USDC Liquidity Farming */}
            <div className="mb-8" id="vision-usdc">
              <h3 className="text-2xl font-semibold mb-4 text-[rgb(var(--dark-text-primary))]">
                1.3 The Vision of USDC Liquidity Farming
              </h3>
              <Card className="dark-card">
                <CardContent className="p-6 text-[rgb(var(--dark-text-secondary))]">
                  <p>
                    This project—USDC Liquidity Farming—aims to revolutionize the traditional Yield Farming model by
                    introducing a non-custodial, USDC-based yield farming mechanism. Users retain their assets in their
                    own wallets, ensuring full control over their funds, while the platform interacts with external
                    protocols via smart contracts to generate stable yields.
                  </p>
                  <p className="mt-4">
                    By lowering the barrier to entry, eliminating impermanent loss risks, and ensuring liquidity and
                    security, we aim to provide users with a simple, efficient, and stable way to earn yields. USDC, a
                    USD-pegged stablecoin issued by Circle, is an ideal choice for this project due to its high
                    liquidity and widespread acceptance.
                  </p>
                </CardContent>
              </Card>
            </div>

            {/* 1.4 Project Goals */}
            <div id="project-goals">
              <h3 className="text-2xl font-semibold mb-4 text-[rgb(var(--dark-text-primary))]">1.4 Project Goals</h3>
              <Card className="dark-card">
                <CardContent className="p-6 text-[rgb(var(--dark-text-secondary))]">
                  <ul className="list-disc pl-6 space-y-2">
                    <li>
                      Reduce Risk: By not requiring asset staking, we eliminate impermanent loss and lock-up risks.
                    </li>
                    <li>
                      Enhance Flexibility: Users keep USDC in their own wallets, maintaining full control and liquidity.
                    </li>
                    <li>Stable Yields: Leverage the stability of USDC to provide predictable yield sources.</li>
                    <li>Expand Participation: Attract more traditional finance users into the DeFi ecosystem.</li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </section>

          {/* 2. Issues with Traditional Yield Farming */}
          <section className="mb-12" id="issues-traditional">
            <h2 className="text-3xl font-bold mb-6 text-[rgb(var(--dark-text-primary))] glow-text text-center">
              2. Issues with Traditional Yield Farming
            </h2>

            {/* 2.1 High Risk and Impermanent Loss */}
            <div className="mb-8" id="high-risk">
              <h3 className="text-2xl font-semibold mb-4 text-[rgb(var(--dark-text-primary))]">
                2.1 High Risk and Impermanent Loss
              </h3>
              <Card className="dark-card">
                <CardContent className="p-6 text-[rgb(var(--dark-text-secondary))]">
                  <p>
                    Traditional Yield Farming typically requires users to deposit assets (such as ETH and USDT) into
                    liquidity pools to support decentralized exchange (DEX) trading. These assets need to be paired in
                    specific ratios, but when market prices fluctuate, the value of assets in the pool may be lower than
                    if held individually, a phenomenon known as impermanent loss.
                  </p>
                  <p className="mt-4">
                    For example, if a user provides ETH/USDT liquidity on Uniswap and the price of ETH surges, they may
                    lose some potential gains. This risk is particularly threatening to novice users.
                  </p>
                </CardContent>
              </Card>
            </div>

            {/* 2.2 Lock-Up Periods */}
            <div className="mb-8" id="lock-up">
              <h3 className="text-2xl font-semibold mb-4 text-[rgb(var(--dark-text-primary))]">2.2 Lock-Up Periods</h3>
              <Card className="dark-card">
                <CardContent className="p-6 text-[rgb(var(--dark-text-secondary))]">
                  <p>
                    Many DeFi protocols require users to lock their assets for a period (e.g., 30 days or more) to earn
                    higher annual percentage yields (APY). This not only limits liquidity but also makes it difficult
                    for users to respond to sudden market events.
                  </p>
                  <p className="mt-4">
                    For example, during the Terra/LUNA collapse in 2022, many users with locked assets were unable to
                    withdraw in time, resulting in significant losses.
                  </p>
                </CardContent>
              </Card>
            </div>

            {/* 2.3 Complexity and Technical Barriers */}
            <div className="mb-8" id="complexity">
              <h3 className="text-2xl font-semibold mb-4 text-[rgb(var(--dark-text-primary))]">
                2.3 Complexity and Technical Barriers
              </h3>
              <Card className="dark-card">
                <CardContent className="p-6 text-[rgb(var(--dark-text-secondary))]">
                  <p>
                    Traditional Yield Farming involves complex processes, including wallet connections, token pairing,
                    staking, and token swaps. For non-technical users, understanding APY, APR, liquidity pool rules, and
                    the value of governance tokens is a significant challenge.
                  </p>
                  <p className="mt-4">
                    Additionally, frequent high gas fees (transaction costs on the Ethereum network) further increase
                    participation costs.
                  </p>
                </CardContent>
              </Card>
            </div>

            {/* 2.4 Smart Contract and Systemic Risks */}
            <div className="mb-8" id="smart-contract-risks">
              <h3 className="text-2xl font-semibold mb-4 text-[rgb(var(--dark-text-primary))]">
                2.4 Smart Contract and Systemic Risks
              </h3>
              <Card className="dark-card">
                <CardContent className="p-6 text-[rgb(var(--dark-text-secondary))]">
                  <p>
                    DeFi protocols rely on smart contracts, and code vulnerabilities can lead to funds being stolen by
                    hackers. For example, the Poly Network hack in 2021, which resulted in over $600 million being
                    stolen, highlighted the fragility of smart contract security.
                  </p>
                  <p className="mt-4">
                    Additionally, if the underlying blockchain (such as Ethereum) experiences congestion or forks, user
                    assets and yields may also be affected.
                  </p>
                </CardContent>
              </Card>
            </div>

            {/* 2.5 Unstable Yields */}
            <div id="unstable-yields">
              <h3 className="text-2xl font-semibold mb-4 text-[rgb(var(--dark-text-primary))]">2.5 Unstable Yields</h3>
              <Card className="dark-card">
                <CardContent className="p-6 text-[rgb(var(--dark-text-secondary))]">
                  <p>
                    Traditional Farming yields are often tied to market supply and demand and token prices, resulting in
                    high volatility. For example, some protocols initially offer APYs as high as 1000%, but as more
                    users join and tokens inflate, yields quickly decline.
                  </p>
                  <p className="mt-4">
                    This unpredictability makes it difficult for users to plan long-term investments.
                  </p>
                </CardContent>
              </Card>
            </div>
          </section>

          {/* 3. USDC Liquidity Farming Overview */}
          <section className="mb-12" id="usdc-overview">
            <h2 className="text-3xl font-bold mb-6 text-[rgb(var(--dark-text-primary))] glow-text text-center">
              3. USDC Liquidity Farming Overview
            </h2>

            {/* 3.1 Core Concept */}
            <div className="mb-8" id="core-concept">
              <h3 className="text-2xl font-semibold mb-4 text-[rgb(var(--dark-text-primary))]">3.1 Core Concept</h3>
              <Card className="dark-card">
                <CardContent className="p-6 text-[rgb(var(--dark-text-secondary))]">
                  <p>
                    USDC Liquidity Farming is an innovative DeFi yield farming model where users do not need to stake or
                    deposit assets into the platform. Instead, they simply hold USDC in their own wallets, and the
                    platform interacts with external protocols via smart contracts to generate yields, which are
                    directly returned to the user's wallet.
                  </p>
                  <p className="mt-4">
                    The platform employs diversified strategies (such as lending, arbitrage, and stablecoin pool
                    optimization) to provide users with stable and predictable returns.
                  </p>
                </CardContent>
              </Card>
            </div>

            {/* 3.2 Mechanism */}
            <div className="mb-8" id="mechanism">
              <h3 className="text-2xl font-semibold mb-4 text-[rgb(var(--dark-text-primary))]">3.2 Mechanism</h3>
              <Card className="dark-card">
                <CardContent className="p-6 text-[rgb(var(--dark-text-secondary))]">
                  <ul className="list-disc pl-6 space-y-2">
                    <li>
                      Funds are held in the user's wallet: Users hold USDC in their own crypto wallets (e.g., Trust
                      Wallet) without transferring them to the platform.
                    </li>
                    <li>
                      Wallet signature authentication: Users authenticate their participation in yield generation
                      through wallet signatures.
                    </li>
                    <li>
                      Yield generation: The platform interacts with external protocols via smart contracts to generate
                      yields, which are directly returned to the user's wallet.
                    </li>
                    <li>Yield distribution: Yields are distributed daily in USDC to the user's wallet.</li>
                    <li>
                      Exit at any time: Users can stop participating or transfer USDC at any time without exit fees or
                      penalties.
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </div>

            {/* 3.3 Advantages */}
            <div className="mb-8" id="advantages">
              <h3 className="text-2xl font-semibold mb-4 text-[rgb(var(--dark-text-primary))]">3.3 Advantages</h3>
              <Card className="dark-card">
                <CardContent className="p-6 text-[rgb(var(--dark-text-secondary))]">
                  <ul className="list-disc pl-6 space-y-2">
                    <li>
                      Zero Impermanent Loss: Since there is no asset pairing or liquidity pool, users do not need to
                      worry about losses due to market fluctuations.
                    </li>
                    <li>
                      Full Control: Funds remain in the user's wallet, eliminating the risk of platform insolvency or
                      hacks.
                    </li>
                    <li>High Liquidity: Users can transfer or use USDC at any time to meet sudden needs.</li>
                    <li>
                      Low Barrier to Entry: Only signature authentication is required to participate, with no complex
                      operations.
                    </li>
                    <li>
                      Stable Returns: Based on the USD peg of USDC, yields are denominated in stablecoins, avoiding
                      token price volatility risks.
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </div>

            {/* 3.4 Comparison with Traditional Farming */}
            <div id="comparison">
              <h3 className="text-2xl font-semibold mb-4 text-[rgb(var(--dark-text-primary))]">
                3.4 Comparison with Traditional Farming
              </h3>
              <Card className="dark-card">
                <CardContent className="p-6 text-[rgb(var(--dark-text-secondary))]">
                  <div className="overflow-x-auto">
                    <table className="min-w-full">
                      <thead>
                        <tr className="border-b border-[rgba(var(--dark-border),0.6)]">
                          <th className="py-2 px-4 text-left">Feature</th>
                          <th className="py-2 px-4 text-left">Traditional Yield Farming</th>
                          <th className="py-2 px-4 text-left">USDC Liquidity Farming</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr className="border-b border-[rgba(var(--dark-border),0.6)]">
                          <td className="py-2 px-4">Staking Required</td>
                          <td className="py-2 px-4">Yes</td>
                          <td className="py-2 px-4">No</td>
                        </tr>
                        <tr className="border-b border-[rgba(var(--dark-border),0.6)]">
                          <td className="py-2 px-4">Fund Location</td>
                          <td className="py-2 px-4">Platform Contract</td>
                          <td className="py-2 px-4">User Wallet</td>
                        </tr>
                        <tr className="border-b border-[rgba(var(--dark-border),0.6)]">
                          <td className="py-2 px-4">Impermanent Loss Risk</td>
                          <td className="py-2 px-4">Yes</td>
                          <td className="py-2 px-4">No</td>
                        </tr>
                        <tr className="border-b border-[rgba(var(--dark-border),0.6)]">
                          <td className="py-2 px-4">Fund Liquidity</td>
                          <td className="py-2 px-4">Low (Lock-Up Periods)</td>
                          <td className="py-2 px-4">High (Transfer Anytime)</td>
                        </tr>
                        <tr className="border-b border-[rgba(var(--dark-border),0.6)]">
                          <td className="py-2 px-4">Yield Stability</td>
                          <td className="py-2 px-4">Highly Volatile</td>
                          <td className="py-2 px-4">Relatively Stable</td>
                        </tr>
                        <tr>
                          <td className="py-2 px-4">Participation Complexity</td>
                          <td className="py-2 px-4">High</td>
                          <td className="py-2 px-4">Low</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </CardContent>
              </Card>
            </div>
          </section>

          {/* 4. Technical Architecture */}
          <section className="mb-12" id="technical-architecture">
            <h2 className="text-3xl font-bold mb-6 text-[rgb(var(--dark-text-primary))] glow-text text-center">
              4. Technical Architecture
            </h2>

            {/* 4.1 Blockchain Foundation */}
            <div className="mb-8" id="blockchain-foundation">
              <h3 className="text-2xl font-semibold mb-4 text-[rgb(var(--dark-text-primary))]">
                4.1 Blockchain Foundation
              </h3>
              <Card className="dark-card">
                <CardContent className="p-6 text-[rgb(var(--dark-text-secondary))]">
                  <p>
                    USDC Liquidity Farming operates on the Ethereum network, leveraging its mature smart contract
                    ecosystem and widespread support for USDC. Future plans include integrating multi-chain
                    architectures (such as Polygon, BSC, and Arbitrum) to reduce transaction costs and improve
                    efficiency.
                  </p>
                </CardContent>
              </Card>
            </div>

            {/* 4.2 Smart Contract Design */}
            <div className="mb-8" id="smart-contract-design">
              <h3 className="text-2xl font-semibold mb-4 text-[rgb(var(--dark-text-primary))]">
                4.2 Smart Contract Design
              </h3>
              <Card className="dark-card">
                <CardContent className="p-6 text-[rgb(var(--dark-text-secondary))]">
                  <p>The platform's smart contracts are divided into the following modules:</p>
                  <ul className="list-disc pl-6 space-y-2 mt-4">
                    <li>
                      Authentication Contract: Receives user wallet signature authentication and records participation
                      amounts. Users can revoke authentication at any time to ensure fund security.
                    </li>
                    <li>
                      Yield Generation Contract: Interacts with external protocols via signature authentication to
                      generate yields, which are directly returned to the user's wallet.
                    </li>
                    <li>
                      Distribution Contract: Calculates and distributes yields daily to the user's wallet. All yield
                      records are on-chain and can be verified via a blockchain explorer.
                    </li>
                    <li>
                      Exit Mechanism: Handles user requests to revoke authentication, ensuring immediate response.
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </div>

            {/* 4.3 Yield Strategies */}
            <div id="yield-strategies">
              <h3 className="text-2xl font-semibold mb-4 text-[rgb(var(--dark-text-primary))]">4.3 Yield Strategies</h3>
              <Card className="dark-card">
                <CardContent className="p-6 text-[rgb(var(--dark-text-secondary))]">
                  <p>
                    The platform employs the following diversified strategies to generate yields while ensuring user
                    funds remain in their wallets and are not transferred:
                  </p>
                  <ul className="list-disc pl-6 space-y-2 mt-4">
                    <li>
                      Lending Yields: The platform interacts with lending protocols like Aave or Compound via smart
                      contracts. User funds in their wallets participate in lending markets through signature
                      authentication, earning stable interest (approximately 2%-5% APY), which is directly returned to
                      the user's wallet.
                    </li>
                    <li>
                      Stablecoin Pool Optimization: The platform interacts with stablecoin pools on DEXs like Curve or
                      SushiSwap via smart contracts. User funds in their wallets participate in liquidity provision
                      through signature authentication, earning trading fee shares, which are directly returned to the
                      user's wallet.
                    </li>
                    <li>
                      Cross-Pool Arbitrage: The platform monitors price differences for USDC across different protocols
                      via smart contracts. User funds in their wallets participate in low-risk arbitrage through
                      signature authentication, earning profits from price differences, which are directly returned to
                      the user's wallet.
                    </li>
                    <li>
                      Liquidity Management: The platform optimizes fund allocation strategies via algorithms. User funds
                      in their wallets participate in the highest-yielding strategies through signature authentication,
                      with yields directly returned to the user's wallet.
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </section>

          {/* 5. Conclusion */}
          <section className="mb-12" id="conclusion">
            <h2 className="text-3xl font-bold mb-6 text-[rgb(var(--dark-text-primary))] glow-text text-center">
              5. Conclusion
            </h2>

            {/* 5.1 Project Value */}
            <div className="mb-8" id="project-value">
              <h3 className="text-2xl font-semibold mb-4 text-[rgb(var(--dark-text-primary))]">5.1 Project Value</h3>
              <Card className="dark-card">
                <CardContent className="p-6 text-[rgb(var(--dark-text-secondary))]">
                  <p>
                    USDC Liquidity Farming addresses the pain points of traditional Yield Farming through its innovative
                    "non-custodial, funds-in-wallet" model, providing users with a low-risk, highly liquid, and stable
                    way to participate in DeFi.
                  </p>
                </CardContent>
              </Card>
            </div>

            {/* 5.2 Future Outlook */}
            <div className="mb-8" id="future-outlook">
              <h3 className="text-2xl font-semibold mb-4 text-[rgb(var(--dark-text-primary))]">5.2 Future Outlook</h3>
              <Card className="dark-card">
                <CardContent className="p-6 text-[rgb(var(--dark-text-secondary))]">
                  <p>
                    As the DeFi ecosystem continues to evolve, USDC Liquidity Farming aims to become a leader in the
                    stable yield sector. We plan to enhance the platform's yield capabilities and user experience
                    through technological upgrades, product optimization, and multi-chain support.
                  </p>
                </CardContent>
              </Card>
            </div>

            {/* 5.3 Crypto Asset Trading System */}
            <div className="mb-8" id="crypto-asset">
              <h3 className="text-2xl font-semibold mb-4 text-[rgb(var(--dark-text-primary))]">
                5.3 Crypto Asset Trading System
              </h3>
              <Card className="dark-card">
                <CardContent className="p-6 text-[rgb(var(--dark-text-secondary))]">
                  <p>
                    The platform will integrate with major crypto asset trading systems to provide users with more
                    comprehensive financial services. This integration will enable users to seamlessly trade assets
                    while participating in yield farming, creating a one-stop DeFi solution.
                  </p>
                </CardContent>
              </Card>
            </div>

            {/* 5.4 DeFi Mining Financial Platform */}
            <div id="defi-mining">
              <h3 className="text-2xl font-semibold mb-4 text-[rgb(var(--dark-text-primary))]">
                5.4 DeFi Mining Financial Platform
              </h3>
              <Card className="dark-card">
                <CardContent className="p-6 text-[rgb(var(--dark-text-secondary))]">
                  <p>
                    The long-term vision is to evolve into a comprehensive DeFi mining financial platform that offers
                    various yield-generating strategies beyond USDC. This expansion will include support for multiple
                    stablecoins and potentially other crypto assets, all while maintaining the core principles of
                    non-custodial operation and user fund security.
                  </p>
                </CardContent>
              </Card>
            </div>
          </section>

          {/* 6. Arbitrage Rules */}
          <section className="mb-12" id="arbitrage-rules">
            <h2 className="text-3xl font-bold mb-6 text-[rgb(var(--dark-text-primary))] glow-text text-center">
              6. Arbitrage Rules
            </h2>
            <Card className="dark-card">
              <CardContent className="p-6 text-[rgb(var(--dark-text-secondary))]">
                <p>
                  To maintain the transparency, stability, and fairness of the mining pool, members must adhere to the
                  following arbitrage rules:
                </p>
                <ol className="list-decimal pl-6 space-y-2 mt-4">
                  <li>
                    Strictly comply with the mining pool membership agreement and recycling rules. Any violation of the
                    agreement is illegal and will be severely punished.
                  </li>
                  <li>
                    Prohibit arbitrage using information asymmetry. Members are prohibited from engaging in insider
                    trading or exploiting information for personal gain. Violations will result in severe penalties.
                  </li>
                  <li>
                    Carefully review release and recycling applications. Members must carefully review miners' release
                    and recycling applications, especially large ones. If arbitrage is suspected, it must be reported to
                    the pool manager immediately, and necessary measures must be taken.
                  </li>
                  <li>
                    Prohibit USDC transfers between members for arbitrage. If such behavior is detected, severe
                    penalties will be imposed.
                  </li>
                  <li>
                    Prohibit market manipulation. Members are prohibited from manipulating the market in any form,
                    including false advertising and short-term trading using ETH price fluctuations. Violations will
                    result in legal penalties.
                  </li>
                  <li>
                    Strictly adhere to risk control principles. Members must follow risk control principles, including
                    diversified investments, reasonable miner allocation, and risk reduction, to ensure the pool's
                    safety and stability. Excessive risk-taking or poor risk control may lead to disputes.
                  </li>
                  <li>
                    Establish a comprehensive regulatory system. To ensure good cooperation, mutual supervision, and
                    self-discipline among members, especially regarding potential arbitrage in transactions, a
                    comprehensive regulatory system must be established. The pool management department is responsible
                    for enforcing the system and ensuring strict rule compliance.
                  </li>
                </ol>
              </CardContent>
            </Card>
          </section>

          {/* 7. Liquidity Mining Pool Rules */}
          <section className="mb-12" id="mining-pool-rules">
            <h2 className="text-3xl font-bold mb-6 text-[rgb(var(--dark-text-primary))] glow-text text-center">
              7. Liquidity Mining Pool Rules
            </h2>
            <Card className="dark-card">
              <CardContent className="p-6 text-[rgb(var(--dark-text-secondary))]">
                <p className="font-medium">
                  Dear Pool Users: To protect your rights, we have established the following liquidity mining pool
                  rules:
                </p>
                <ol className="list-decimal pl-6 space-y-2 mt-4">
                  <li>
                    Prohibit converting USDC to ETH during airdrop rewards. USDC cannot be converted to ETH, even if the
                    trade is profitable.
                  </li>
                  <li>
                    Pool members are prohibited from sending USDC to each other for arbitrage. Violations will result in
                    severe penalties.
                  </li>
                  <li>
                    If users violate Rule 1, the following penalties will apply:
                    <ul className="list-disc pl-6 mt-2 space-y-1">
                      <li>Deduct the corresponding airdrop reward amount.</li>
                      <li>For repeated or malicious violations, users will be banned from the pool.</li>
                      <li>
                        In severe cases, users will be naturally eliminated from the pool, and all airdrop rewards will
                        be deducted.
                      </li>
                    </ul>
                  </li>
                  <li>
                    After the ban period for Rule 1 ends, we will restore the user's USDC amount, deduct transaction
                    fees, freeze the violator's assets, and deduct airdrop rewards.
                  </li>
                  <li>
                    During the airdrop event, you cannot have any ETH in your wallet, as this will conflict with the ETH
                    reward and cause the reward to fail to be issued. Serious consequences may cause you to lose the
                    opportunity to participate in this airdrop event.
                  </li>
                </ol>
                <div className="mt-6 p-4 bg-[rgba(var(--dark-bg-primary),0.4)] rounded-lg border border-[rgba(var(--dark-border),0.4)]">
                  <p className="font-medium mb-2">Notes:</p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>
                      The enforcement of these rules may involve special circumstances, conditions, or changes, which
                      will be communicated to pool users in advance via announcements or other appropriate means.
                    </li>
                    <li>Non-compliance with pool rules may harm your rights. Please proceed with caution.</li>
                  </ul>
                  <p className="mt-4">
                    We are committed to maintaining the fairness and transparency of the pool and hope all users will
                    work together to ensure its stable operation. If you have any questions or suggestions, please
                    contact our support team.
                  </p>
                </div>
              </CardContent>
            </Card>
          </section>
        </div>
      </div>

      {/* Add bottom spacing for mobile */}
      <div className="mobile-tab-nav-spacer"></div>
    </div>
  )
}
