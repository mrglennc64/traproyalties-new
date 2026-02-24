// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

/**
 * @title TrapRoyaltiesPro_ESeal
 * @dev Judicial-grade proof of split agreement for Atlanta music litigation.
 */
contract TrapRoyaltiesPro_ESeal {
    struct SplitRecord {
        bytes32 docHash;      // SHA-256 fingerprint of the split sheet
        bytes32 audioHash;    // Optional: Fingerprint of the audio file (the "Demo")
        uint256 timestamp;    // Block time (Judicial Proof of Date)
        address recordedBy;   // The Lawyer or Artist wallet
        bool biometricVerified; // Flag for biometric verification
        string signerName;    // Name of the signer
        bool isValid;
    }

    mapping(string => SplitRecord) public records; // Mapping VerificationID => Record
    mapping(string => address[]) public signatures; // Track multiple signatures per document

    event ESealCreated(string indexed verificationId, bytes32 docHash, uint256 timestamp, address signer);
    event DocumentFullySigned(string indexed verificationId, uint256 signatureCount);

    function createESeal(
        string memory _vId, 
        bytes32 _docHash, 
        bytes32 _audioHash,
        bool _biometricVerified,
        string memory _signerName
    ) external {
        require(!records[_vId].isValid, "E-Seal already exists for this ID");
        
        records[_vId] = SplitRecord({
            docHash: _docHash,
            audioHash: _audioHash,
            timestamp: block.timestamp,
            recordedBy: msg.sender,
            biometricVerified: _biometricVerified,
            signerName: _signerName,
            isValid: true
        });

        signatures[_vId].push(msg.sender);

        emit ESealCreated(_vId, _docHash, block.timestamp, msg.sender);
    }

    function addSignature(
        string memory _vId,
        bytes32 _docHash,
        bool _biometricVerified,
        string memory _signerName
    ) external {
        require(records[_vId].isValid, "Document not found");
        require(records[_vId].docHash == _docHash, "Document hash mismatch");
        
        signatures[_vId].push(msg.sender);
        
        emit ESealCreated(_vId, _docHash, block.timestamp, msg.sender);
    }

    function verifySeal(string memory _vId) external view returns (
        bytes32 docHash,
        uint256 timestamp,
        address[] memory signers,
        bool biometricVerified
    ) {
        require(records[_vId].isValid, "E-Seal not found");
        SplitRecord memory r = records[_vId];
        return (r.docHash, r.timestamp, signatures[_vId], r.biometricVerified);
    }

    function getSignatureCount(string memory _vId) external view returns (uint256) {
        return signatures[_vId].length;
    }
}