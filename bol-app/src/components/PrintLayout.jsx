import React from "react";
import BOLLayout from "./BOLLayout";
import TempLayout from "./TempLayout";

export default function PrintLayout({
  activePreview,
  bolTemplateType,
  trailerNumber,
  sealNumber,
  qty,
  bolNumber,
  supervisorName,
  initials,
  checks,
  issueTexts,
  temperature,
}) {
  return (
    <div className="print-wrapper">

      {activePreview === "BOL" && (
        <div
          className="bol-print-area print-bol"
          style={{
            width: "210mm",
            minHeight: "297mm",
            margin: "0 auto",
            padding: "8mm",
            boxSizing: "border-box",
          }}
        >
          <BOLLayout
            mode={bolTemplateType}
            trailerNumber={trailerNumber}
            sealNumber={sealNumber}
            qty={qty}
            bolNumber={bolNumber}
          />
        </div>
      )}

      {activePreview === "TEMP" && (
        <div
          className="temp-print-area"
          style={{
            width: "210mm",
            minHeight: "297mm",
            margin: "0 auto",
            padding: "12mm",
            border: "2px solid #000",
            borderTop: "4px solid #000",
            boxSizing: "border-box",
          }}
        >
          <TempLayout
            trailerNumber={trailerNumber}
            supervisorName={supervisorName}
            initials={initials}
            checks={checks}
            issueTexts={issueTexts}
            temperature={temperature}
          />
        </div>
      )}

    </div>
  );
}
