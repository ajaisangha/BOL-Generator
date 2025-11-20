import React from "react";

/* ----------------------------------------------------------
   BOL TEMPLATE (no changes)
---------------------------------------------------------- */
function BOLLayout({ mode, trailerNumber, sealNumber, qty, bolNumber }) {
  const today = new Date();
  const dateStr = today.toLocaleDateString("en-CA");
  const isOttawa = mode === "ottawa";

  const shipToText = isOttawa
    ? "Ottawa Spoke\n2445 Don Reid Dr, Ottawa, ON K1H 1E2"
    : "Etobicoke Spoke\n1561 The Queensway\nEtobicoke, ON M8Z 1T8";

  const frames = isOttawa ? 32 : 36;
  const totes = Number(qty || 0);
  const weightLbs = frames * 50 + totes * 37;

  return (
    <div className="print-area bol-page page">
      <h2 style={{ fontWeight: "bold", textAlign: "center" }}>
        Straight Bill of Lading
      </h2>
      <p style={{ textAlign: "center" }}>Original - Not Negotiable</p>

      <table className="bol-table">
        <tbody>
          <tr>
            <td className="label-cell">Ship From:</td>
            <td colSpan={7}>
              Vaughan CFC <br />
              100 Gibraltar Road <br />
              Vaughan, ON L4H 3N5
            </td>
            <td className="label-cell">Date:</td>
            <td>{dateStr}</td>
          </tr>

          <tr>
            <td className="label-cell">Ship To:</td>
            <td colSpan={7}>
              {shipToText.split("\n").map((l, i) => (
                <div key={i}>{l}</div>
              ))}
            </td>
            <td className="label-cell">BOL #:</td>
            <td>{bolNumber}</td>
          </tr>

          <tr>
            <td className="label-cell">Trailer #</td>
            <td>{trailerNumber}</td>

            <td className="label-cell">Seal #</td>
            <td>{sealNumber}</td>

            <td className="label-cell">Frames</td>
            <td>{frames}</td>

            <td className="label-cell">Totes</td>
            <td>{totes}</td>

            <td className="label-cell">Weight</td>
            <td>{weightLbs}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

/* ----------------------------------------------------------
   TEMP CHECK TEMPLATE (temperature updated)
---------------------------------------------------------- */
function TempLayout({
  trailerNumber,
  supervisorName,
  initials,
  checks,
  issueTexts,
  temperature, // NEW
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

  const formattedTemp = temperature
    ? `${temperature}°C`
    : "";

  const failureLines = anyFailed
    ? failedEntries
        .map(([key]) => {
          const num = key.replace("q", "");
          const text = issueTexts[key] || "";
          return `Failed ${num} – ${text}`;
        })
        .join("\n")
    : "";

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
          <tr><td>1</td><td>Incoming Trailer in Good Condition</td><td>{mark(checks.q1)}</td></tr>
          <tr><td>2</td><td>Cleanliness (No Contamination Risk from Dirt, Debris, Garbage, Damaged Pallets, etc.)</td><td>{mark(checks.q2)}</td></tr>
          <tr><td>3</td><td>Structural Concerns (No visible trailer damage or holes that can compromise product)</td><td>{mark(checks.q3)}</td></tr>
          <tr><td>4</td><td>No Indication and Free of Pest Infestation</td><td>{mark(checks.q4)}</td></tr>
          <tr><td>5</td><td>Within Temperature Range and No Signs of Temperature Abuse</td><td>{mark(checks.q5)}</td></tr>
          <tr><td>6</td><td>No Signs of Physical Damage to Product or Packaging </td><td>{mark(checks.q6)}</td></tr>
          <tr><td>7</td><td>No Signs and Free of Chemical Contamination and Other Contaminates </td><td>{mark(checks.q7)}</td></tr>
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
          {/* Main row */}
          <tr>
            <td className="center">{trailerNumber}</td>
            <td className="center">{formattedTemp}</td>
            <td className="center">{checks.q5 === "yes" ? "Y" : "N"}</td>
            <td className="center">{checks.q5 === "no" ? "5" : ""}</td>
            <td className="center">{initials}</td>
          </tr>

          {/* Failure rows */}
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
        1. Delivery trucks shall be pre-cooled to no greater than4°C (40°F).  Frozen products must be maintained at a temperature that will prevent thawing and maintain product quality and safety.
        <br /><br />
        2. In the event that a delivery truck does not meet the food safety criteria above, the shipper shall contact the Outbound Supervisorfor follow-up as identified below:
        <br/>The Outbound Supervisor must initial receipt of a delivery truck on the shipping document if a deviation is reported, and confirm that corrective action is complete for the delivery truck to be accepted into service.
      </p>
    </div>
  );
}

/* ----------------------------------------------------------
   EXPORT
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
  temperature, // NEW
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
          temperature={temperature} // NEW
        />
      )}
    </div>
  );
}
