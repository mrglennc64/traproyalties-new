const hre = require("hardhat");

async function main() {
  console.log("Deploying TrapRoyaltiesPro_ESeal...");
  
  // Make sure hre.ethers is available
  if (!hre.ethers) {
    console.error("Hardhat ethers plugin not loaded. Make sure @nomicfoundation/hardhat-ethers is installed.");
    process.exit(1);
  }
  
  const TrapRoyaltiesESeal = await hre.ethers.getContractFactory("TrapRoyaltiesPro_ESeal");
  const contract = await TrapRoyaltiesESeal.deploy();
  
  await contract.waitForDeployment();
  
  const address = await contract.getAddress();
  console.log("✅ Contract deployed to:", address);
  
  // Save contract info for frontend
  const fs = require("fs");
  const path = require("path");
  
  const contractInfo = {
    address: address,
    abi: JSON.parse(fs.readFileSync(
      path.join(__dirname, "../artifacts/contracts/TrapRoyaltiesESeal.sol/TrapRoyaltiesPro_ESeal.json"), 
      "utf8"
    )).abi
  };
  
  // Create frontend contracts folder if it doesn't exist
  const frontendContractPath = path.join(__dirname, "../../frontend/contracts");
  if (!fs.existsSync(frontendContractPath)) {
    fs.mkdirSync(frontendContractPath, { recursive: true });
  }
  
  fs.writeFileSync(
    path.join(frontendContractPath, "TrapRoyaltiesESeal.deployed.json"),
    JSON.stringify(contractInfo, null, 2)
  );
  console.log("📄 Contract info saved to frontend");
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
