import React from "react";

/* ----------------------------------------------------------
   BOL TEMPLATE — matches Excel-style layout
---------------------------------------------------------- */
function BOLLayout({ mode, trailerNumber, sealNumber, qty, bolNumber }) {
  const today = new Date();
  const dateStr = today.toLocaleDateString("en-CA");

  const isOttawa = mode === "ottawa";

  const shipToText = isOttawa
    ? [
        "Ottawa Spoke",
        "2445 Don Reid Dr",
        "Ottawa, ON K1H 1E2",
      ]
    : [
        "Etobicoke Spoke",
        "1561 The Queensway",
        "Etobicoke, ON M8Z 1T8",
      ];

  // Business rules from user
  const frames = Number(qty || 0);                 // frames = Qty entered
  const packages = frames * 20;                    // package qty = frames * 20
  const weight = frames + packages;                // weight = frames + package qty

  const carrierName = isOttawa ? "Canada Cartage" : "Sobeys Inc.";

  return (
    <div className="print-area bol-page page">
      {/* TOP HEADER / ADDRESS / CARRIER BLOCK */}
      <table className="bol-table" style={{ fontSize: "11px" }}>
        <tbody>
          {/* Row 1: Title + Date */}
          <tr>
            <td colSpan={8} style={{ verticalAlign: "top" }}>
              <div style={{ fontWeight: "bold" }}>Straight Bill of Lading</div>
              <div>Original - Not Negotiable</div>
            </td>
            <td colSpan={2} className="label-cell">
              Date:
            </td>
            <td colSpan={2}>{dateStr}</td>
          </tr>

          {/* Row 2: Ship From + BOL No */}
          <tr>
            <td className="label-cell" style={{ width: "10%" }}>
              Ship From:
            </td>
            <td colSpan={7} style={{ width: "45%" }}>
              Vaughan CFC
              <br />
              100 Gibraltar Road
              <br />
              Vaughan, ON L4H 3N5
            </td>
            <td colSpan={2} className="label-cell">
              Bill of Lading No:
            </td>
            <td colSpan={2} style={{ backgroundColor: "#ffff99" }}>
              {bolNumber}
            </td>
          </tr>

          {/* Row 3: SID / Carrier Name */}
          <tr>
            <td className="label-cell">SID#:</td>
            <td colSpan={3}></td>
            <td colSpan={2} style={{ textAlign: "center" }}>
              FOB
            </td>
            <td colSpan={2}></td>
            <td colSpan={2} className="label-cell">
              Carrier Name:
            </td>
            <td colSpan={2}>{carrierName}</td>
          </tr>

          {/* Row 4: Ship To / Trailer # */}
          <tr>
            <td className="label-cell">Ship To:</td>
            <td colSpan={7}>
              {shipToText.map((line, idx) => (
                <div key={idx}>{line}</div>
              ))}
            </td>
            <td colSpan={2} className="label-cell">
              Trailer No:
            </td>
            <td colSpan={2} style={{ backgroundColor: "#ffff99" }}>
              {trailerNumber}
            </td>
          </tr>

          {/* Row 5: CID / Seal */}
          <tr>
            <td className="label-cell">CID#:</td>
            <td colSpan={3}></td>
            <td colSpan={2} style={{ textAlign: "center" }}>
              FOB
            </td>
            <td colSpan={2}></td>
            <td colSpan={2} className="label-cell">
              Seal Number(s):
            </td>
            <td colSpan={2} style={{ backgroundColor: "#ffff99" }}>
              {sealNumber}
            </td>
          </tr>
        </tbody>
      </table>

      {/* FREIGHT TERMS + SPECIAL INSTRUCTIONS + (MILEAGE) */}
      <table className="bol-table" style={{ fontSize: "10px" }}>
        <tbody>
          <tr>
            {/* Freight charge terms */}
            <td className="label-cell" style={{ width: "40%" }}>
              Freight Charge Terms (prepaid unless marked otherwise):
            </td>
            <td style={{ width: "10%" }}>
              <input type="checkbox" style={{ transform: "scale(0.8)" }} />{" "}
              Prepaid
            </td>
            <td style={{ width: "10%" }}>
              <input type="checkbox" style={{ transform: "scale(0.8)" }} />{" "}
              Collect
            </td>
            <td style={{ width: "10%" }}>
              <input type="checkbox" style={{ transform: "scale(0.8)" }} /> 3rd
              Party
            </td>

            {/* Special instructions header */}
            <td className="label-cell" style={{ width: "10%" }}>
              Special Instructions:
            </td>
            <td style={{ width: "20%", textAlign: "right" }}>
              <input type="checkbox" style={{ transform: "scale(0.8)" }} />{" "}
              Master BOL
            </td>
          </tr>

          {/* Mileage block (Ottawa only) */}
          {isOttawa && (
            <>
              <tr>
                <td colSpan={4}></td>
                <td colSpan={2}>
                  Voila CFC1 Departure Time :
                  <br />
                  Mileage Start :
                  <br />
                  Ottawa Spoke Arrival Time :
                  <br />
                  Mileage End :
                  <br />
                  Total Mileage :
                </td>
              </tr>
            </>
          )}
        </tbody>
      </table>

      {/* COMMODITY / HANDLING TABLE */}
      <table className="bol-table" style={{ fontSize: "10px", marginTop: "4px" }}>
        <thead>
          <tr>
            <th rowSpan={2} style={{ width: "6%" }}>
              Handling Unit
              <br />
              QTY
            </th>
            <th rowSpan={2} style={{ width: "7%" }}>
              Handling Unit
              <br />
              Type
            </th>
            <th rowSpan={2} style={{ width: "6%" }}>
              Package
              <br />
              QTY
            </th>
            <th rowSpan={2} style={{ width: "7%" }}>
              Package
              <br />
              Type
            </th>
            <th rowSpan={2} style={{ width: "8%" }}>
              Wt. U.N. (lbs)
            </th>
            <th rowSpan={2} style={{ width: "5%" }}>
              H.M.
            </th>
            <th style={{ width: "45%" }}>
              Commodity Description
            </th>
            <th rowSpan={2} style={{ width: "8%" }}>
              LTL Only
              <br />
              NMFC No
              <br />
              Class
            </th>
          </tr>
          <tr>
            <th>
              Commodities requiring special or additional care or attention in
              handling or stowing must be so marked and packaged as to ensure
              safe transportation with ordinary care.
            </th>
          </tr>
        </thead>
        <tbody>
          {/* Main commodity row */}
          <tr>
            <td className="center" style={{ backgroundColor: "#ffff99" }}>
              {frames || ""}
            </td>
            <td className="center">Frames</td>
            <td className="center">{frames ? packages : ""}</td>
            <td className="center">Totes</td>
            <td className="center">{frames || packages ? weight : ""}</td>
            <td></td>
            <td>Mixed grocery</td>
            <td></td>
          </tr>

          {/* A few blank rows to visually match grid */}
          {[...Array(5)].map((_, idx) => (
            <tr key={idx}>
              <td>&nbsp;</td>
              <td>&nbsp;</td>
              <td>&nbsp;</td>
              <td>&nbsp;</td>
              <td>&nbsp;</td>
              <td>&nbsp;</td>
              <td>&nbsp;</td>
              <td>&nbsp;</td>
            </tr>
          ))}

          {/* Totals row */}
          <tr>
            <td className="center" style={{ backgroundColor: "#ffff99" }}>
              {frames || ""}
            </td>
            <td className="center">Frames</td>
            <td className="center">{frames ? packages : ""}</td>
            <td className="center">Totes</td>
            <td className="center">{frames || packages ? weight : ""}</td>
            <td></td>
            <td>Totals</td>
            <td></td>
          </tr>
        </tbody>
      </table>

      {/* DECLARED VALUE / SHIPPER SIGNATURE SECTION */}
      <table className="bol-table" style={{ fontSize: "9px", marginTop: "4px" }}>
        <tbody>
          <tr>
            <td style={{ width: "50%", verticalAlign: "top" }}>
              Where the rate is dependent on value, shippers are required to
              state specifically in writing the agreed or declared value of the
              property as follows:
              <br />
              <br />
              The agreed or declared value of the property is specifically
              stated by the shipper to be not exceeding
              <br />
              <br />
              _____________________________
              <br />
              FOB _________________________
            </td>
            <td style={{ width: "50%", verticalAlign: "top" }}>
              The carrier shall not make delivery of this shipment without
              payment of freight and all other lawful charges.
              <br />
              <br />
              ________________________________________
              <br />
              Shipper Signature
            </td>
          </tr>
        </tbody>
      </table>

      {/* LIABILITY NOTICE */}
      <table className="bol-table" style={{ fontSize: "8px", marginTop: "4px" }}>
        <tbody>
          <tr>
            <td>
              <strong>NOTE:</strong> Liability limitation for loss or damage in
              this shipment may be applicable. See 49 U.S.C. §14706(c)(1)(A)
              and (B). RECEIVED, subject to individually determined rates or
              contracts that have been agreed upon in writing between the
              carrier and shipper, if applicable, otherwise to the rates,
              classifications and rules that have been established by the
              carrier and are available to the shipper on request. The property
              described above, in apparent good order, except as noted
              (contents and condition of contents of packages unknown), marked,
              consigned, and destined as shown above, which said carrier agrees
              to carry to destination, if on its route, or otherwise to deliver
              to another carrier on the route to destination. Every service to
              be performed hereunder shall be subject to all of the bill of
              lading terms and conditions in the governing classification on
              the date of shipment. Shipper hereby certifies that he is
              familiar with all the bill of lading terms and conditions in the
              governing classification and the said terms and conditions are
              hereby agreed to by the shipper and accepted for himself and his
              assigns.
            </td>
          </tr>
        </tbody>
      </table>

      {/* TRAILER LOADED / FREIGHT COUNTED / SIGNATURES */}
      <table className="bol-table" style={{ fontSize: "9px", marginTop: "4px" }}>
        <tbody>
          <tr>
            <td style={{ width: "35%", verticalAlign: "top" }}>
              This is to certify that the above named materials are properly
              classified, packaged, marked and labeled, and are in proper
              condition for transportation according to the applicable
              regulations of the DOT.
            </td>
            <td style={{ width: "25%", verticalAlign: "top" }}>
              <strong>Trailer Loaded</strong>
              <br />
              <input type="checkbox" style={{ transform: "scale(0.8)" }} /> By
              Shipper
              <br />
              <input type="checkbox" style={{ transform: "scale(0.8)" }} /> By
              Driver
            </td>
            <td style={{ width: "25%", verticalAlign: "top" }}>
              <strong>Freight Counted</strong>
              <br />
              <input type="checkbox" style={{ transform: "scale(0.8)" }} /> By
              Shipper
              <br />
              <input type="checkbox" style={{ transform: "scale(0.8)" }} /> By
              Driver / pallet said to contain
              <br />
              <input type="checkbox" style={{ transform: "scale(0.8)" }} /> By
              Driver / pieces
            </td>
            <td style={{ width: "15%", verticalAlign: "top" }}>
              Carrier acknowledges receipt of packages and required placards.
              Carrier certifies emergency response information was made
              available and/or carrier has the DOT emergency response guidebook
              or equivalent documentation in the vehicle. Property described
              above is received in good order, except as noted.
            </td>
          </tr>
        </tbody>
      </table>

      {/* BOTTOM SIGNATURE LINE */}
      <table className="bol-table" style={{ fontSize: "9px", marginTop: "4px" }}>
        <tbody>
          <tr>
            <td style={{ width: "40%" }}>
              ______________________________________
              <br />
              Shipper Signature
            </td>
            <td style={{ width: "20%" }}>
              Date: {dateStr}
            </td>
            <td style={{ width: "40%" }}>
              ______________________________________
              <br />
              Carrier Signature / Pickup Date
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

/* ----------------------------------------------------------
   TEMP CHECK TEMPLATE (same logic as before)
---------------------------------------------------------- */
function TempLayout({
  trailerNumber,
  supervisorName,
  initials,
  checks,
  issueTexts,
  temperature,
}) {
  const today = new Date();
  const dateStr = today.toLocaleDateString("en-CA");
  const timeStr = today.toLocaleTimeString("en-CA", {
    hour: "2-digit",
    minute: "2-digit",
  });

  const mark = (v) => (v === "yes" ? "✓" : "✗");

  const failedEntries = Object.entries(checks).filter(
    ([, v]) => v === "no"
  );
  const anyFailed = failedEntries.length > 0;

  const failureLines = anyFailed
    ? failedEntries
        .map(([key]) => {
          const num = key.replace("q", "");
          const text = issueTexts[key] || "";
          return `Failed ${num} – ${text}`;
        })
        .join("\n")
    : "";

  const formattedTemp = temperature ? `${temperature}°C` : "";

  return (
    <div className="print-area temp-page page">
      <h2 style={{ fontWeight: "bold", textAlign: "center" }}>
        Voilà Trailer Pre-Load Form
      </h2>

      <table className="bol-table">
        <tbody>
          <tr>
            <td style={{ fontWeight: "bold" }}>DATE</td>
            <td>{dateStr}</td>
          </tr>
          <tr>
            <td style={{ fontWeight: "bold" }}>Time</td>
            <td>{timeStr}</td>
          </tr>
          <tr>
            <td style={{ fontWeight: "bold" }}>Trailer #</td>
            <td>{trailerNumber}</td>
          </tr>
        </tbody>
      </table>

      <p style={{ fontWeight: "bold", marginTop: "8px" }}>
        Does Van/Trailer comply with the following standards (✓ or ✗):
      </p>

      <table className="bol-table">
        <tbody>
          <tr>
            <td>1</td>
            <td>Incoming Trailer in Good Condition</td>
            <td>{mark(checks.q1)}</td>
          </tr>
          <tr>
            <td>2</td>
            <td>
              Cleanliness (No Contamination Risk from Dirt, Debris, Garbage,
              Damaged Pallets, etc.)
            </td>
            <td>{mark(checks.q2)}</td>
          </tr>
          <tr>
            <td>3</td>
            <td>
              Structural Concerns (No visible trailer damage or holes that can
              compromise product)
            </td>
            <td>{mark(checks.q3)}</td>
          </tr>
          <tr>
            <td>4</td>
            <td>No Indication and Free of Pest Infestation</td>
            <td>{mark(checks.q4)}</td>
          </tr>
          <tr>
            <td>5</td>
            <td>Within Temperature Range and No Signs of Temperature Abuse</td>
            <td>{mark(checks.q5)}</td>
          </tr>
          <tr>
            <td>6</td>
            <td>No Signs of Physical Damage to Product or Packaging</td>
            <td>{mark(checks.q6)}</td>
          </tr>
          <tr>
            <td>7</td>
            <td>
              No Signs and Free of Chemical Contamination and Other
              Contaminates
            </td>
            <td>{mark(checks.q7)}</td>
          </tr>
        </tbody>
      </table>

      <table className="bol-table" style={{ marginTop: "8px" }}>
        <thead>
          <tr>
            <th style={{ fontWeight: "bold" }}>Trailer #</th>
            <th style={{ fontWeight: "bold" }}>Temperature (°C)*</th>
            <th style={{ fontWeight: "bold" }}>Comply? (Y/N)</th>
            <th style={{ fontWeight: "bold" }}>If No, Indicate # from above</th>
            <th style={{ fontWeight: "bold" }}>Initials</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="center">{trailerNumber}</td>
            <td className="center">{formattedTemp}</td>
            <td className="center">{checks.q5 === "yes" ? "Y" : "N"}</td>
            <td className="center">{checks.q5 === "no" ? "5" : ""}</td>
            <td className="center">{initials}</td>
          </tr>

          {anyFailed && (
            <tr>
              <td className="center" style={{ fontWeight: "bold" }}>
                {trailerNumber}
              </td>
              <td className="center">—</td>
              <td className="center">N</td>
              <td
                className="center"
                style={{ whiteSpace: "pre-line", fontSize: "11px" }}
              >
                {failureLines}
              </td>
              <td className="center">{initials}</td>
            </tr>
          )}
        </tbody>
      </table>

      <p style={{ fontWeight: "bold", fontSize: "10px" }}>
        * Please always indicate a decimal for the temperature degrees Celsius.
      </p>

      <table className="bol-table">
        <tbody>
          <tr>
            <td style={{ fontWeight: "bold" }}>Supervisor Name</td>
            <td style={{ fontWeight: "bold" }}>{supervisorName}</td>
          </tr>
        </tbody>
      </table>

      <p style={{ fontSize: "10px", marginTop: "8px" }}>
        1. Delivery trucks shall be pre-cooled to no greater than 4°C (40°F).
        Frozen products must be maintained safely.
        <br />
        <br />
        2. If a truck does not meet criteria, the shipper must contact the
        Outbound Supervisor:
        <br />
        • Supervisor must initial and confirm corrective action is complete.
      </p>
    </div>
  );
}

/* ----------------------------------------------------------
   EXPORT — chooses between BOL and TEMP
---------------------------------------------------------- */
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
        <BOLLayout
          mode={bolTemplateType}
          trailerNumber={trailerNumber}
          sealNumber={sealNumber}
          qty={qty}
          bolNumber={bolNumber}
        />
      )}

      {activePreview === "TEMP" && (
        <TempLayout
          trailerNumber={trailerNumber}
          supervisorName={supervisorName}
          initials={initials}
          checks={checks}
          issueTexts={issueTexts}
          temperature={temperature}
        />
      )}
    </div>
  );
}
