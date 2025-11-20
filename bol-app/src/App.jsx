import React, { useState, useMemo } from "react";
import PrintLayout from "./components/PrintLayout";
import "./App.css";

const TRAILER_OPTIONS = [
  { value: "832059", label: "832059 (Ottawa)", site: "ottawa" },
  { value: "832124", label: "832124 (Ottawa)", site: "ottawa" },
  { value: "53192", label: "53192 (Etobicoke)", site: "etobicoke" },
  { value: "53251", label: "53251 (Etobicoke)", site: "etobicoke" },
  { value: "53252", label: "53252 (Etobicoke)", site: "etobicoke" },
  { value: "other", label: "Other", site: null },
];

function App() {
  // Which document type: BOL or TEMP
  const [docType, setDocType] = useState("BOL");

  const [selectedTrailerOption, setSelectedTrailerOption] = useState("832059");
  const [otherLocation, setOtherLocation] = useState("ottawa");
  const [customTrailerNumber, setCustomTrailerNumber] = useState("");

  const [sealNumber, setSealNumber] = useState("");
  const [qty, setQty] = useState("");

  const [supervisorName, setSupervisorName] = useState("");
  const [initials, setInitials] = useState("");

  // Default temperature = 2.2
  const [temperature, setTemperature] = useState("2.2");

  const [checks, setChecks] = useState({
    q1: "yes",
    q2: "yes",
    q3: "yes",
    q4: "yes",
    q5: "yes",
    q6: "yes",
    q7: "yes",
  });

  const [issueTexts, setIssueTexts] = useState({
    q1: "",
    q2: "",
    q3: "",
    q4: "",
    q5: "",
    q6: "",
    q7: "",
  });

  const selectedMeta = TRAILER_OPTIONS.find(
    (t) => t.value === selectedTrailerOption
  );

  const trailerNumber =
    selectedTrailerOption === "other"
      ? customTrailerNumber.trim()
      : selectedTrailerOption;

  const bolTemplateType =
    selectedTrailerOption === "other"
      ? otherLocation
      : selectedMeta?.site || "ottawa";

  const bolNumber = useMemo(() => {
    if (!trailerNumber) return "";
    const d = new Date();
    const yyyy = d.getFullYear();
    const mm = String(d.getMonth() + 1).padStart(2, "0");
    const dd = String(d.getDate()).padStart(2, "0");
    return `V_${yyyy}${mm}${dd}_${trailerNumber}`;
  }, [trailerNumber]);

  const handlePrint = () => {
    window.print();
  };

  const yesNoSelect = (label, key) => (
    <label className="form-field" key={key}>
      <span>{label}</span>
      <select
        value={checks[key]}
        onChange={(e) => setChecks({ ...checks, [key]: e.target.value })}
      >
        <option value="yes">Yes</option>
        <option value="no">No</option>
      </select>
    </label>
  );

  const failedKeys = Object.entries(checks)
    .filter(([, value]) => value === "no")
    .map(([key]) => key);

  const anyFailures = failedKeys.length > 0;

  const activePreview = docType === "BOL" ? "BOL" : "TEMP";

  return (
    <div className="app-container">
      {/* Top title centered */}
      <div className="app-header">
        <h1>Trailer Paperwork Generator</h1>
      </div>

      {/* Main 2-column layout */}
      <div className="app-body">
        {/* LEFT SIDE — options + fields */}
        <div className="left-panel">
          <div className="form-root">
            {/* Step 1: Choose document type */}
            <div className="form-field">
              <span style={{ fontWeight: "bold", marginBottom: 4 }}>
                What do you want to generate?
              </span>
              <div className="doc-type-options">
                <label>
                  <input
                    type="radio"
                    name="docType"
                    value="BOL"
                    checked={docType === "BOL"}
                    onChange={() => setDocType("BOL")}
                  />
                  BOL
                </label>
                <label>
                  <input
                    type="radio"
                    name="docType"
                    value="TEMP"
                    checked={docType === "TEMP"}
                    onChange={() => setDocType("TEMP")}
                  />
                  Temp Check
                </label>
              </div>
            </div>

            {/* Trailer Selection (used for both) */}
            <label className="form-field">
              <span>Trailer</span>
              <select
                value={selectedTrailerOption}
                onChange={(e) => setSelectedTrailerOption(e.target.value)}
              >
                {TRAILER_OPTIONS.map((t) => (
                  <option key={t.value} value={t.value}>
                    {t.label}
                  </option>
                ))}
              </select>
            </label>

            {selectedTrailerOption === "other" && (
              <>
                <label className="form-field">
                  <span>Trailer Number (Other)</span>
                  <input
                    value={customTrailerNumber}
                    onChange={(e) => setCustomTrailerNumber(e.target.value)}
                  />
                </label>

                <label className="form-field">
                  <span>Trailer Type</span>
                  <select
                    value={otherLocation}
                    onChange={(e) => setOtherLocation(e.target.value)}
                  >
                    <option value="ottawa">Ottawa</option>
                    <option value="etobicoke">Etobicoke</option>
                  </select>
                </label>
              </>
            )}

            {/* ---------------- TEMP CHECK FIELDS ---------------- */}
            {docType === "TEMP" && (
              <>
                <h3>Temp Check Details</h3>

                <label className="form-field">
                  <span>Temperature (°C)</span>
                  <input
                    type="number"
                    step="0.1"
                    value={temperature}
                    onChange={(e) => setTemperature(e.target.value)}
                  />
                </label>

                <label className="form-field">
                  <span>Supervisor Name</span>
                  <input
                    value={supervisorName}
                    onChange={(e) => setSupervisorName(e.target.value)}
                  />
                </label>

                <label className="form-field">
                  <span>Initials</span>
                  <input
                    value={initials}
                    onChange={(e) => setInitials(e.target.value)}
                  />
                </label>

                <h3>Temp Check Questions</h3>

                {yesNoSelect("Incoming Trailer in Good Condition", "q1")}
                {yesNoSelect(
                  "Cleanliness (No contamination risk)",
                  "q2"
                )}
                {yesNoSelect("Structural Concerns", "q3")}
                {yesNoSelect("No indication of pest infestation", "q4")}
                {yesNoSelect("No temperature abuse", "q5")}
                {yesNoSelect("No physical damage", "q6")}
                {yesNoSelect("No chemical contamination", "q7")}

                {anyFailures &&
                  failedKeys.map((key) => {
                    const num = key.replace("q", "");
                    return (
                      <label className="form-field" key={key}>
                        <span>Issue for #{num}</span>
                        <textarea
                          rows={2}
                          value={issueTexts[key]}
                          onChange={(e) =>
                            setIssueTexts({
                              ...issueTexts,
                              [key]: e.target.value,
                            })
                          }
                        />
                      </label>
                    );
                  })}

                <button
                  className="print-button"
                  onClick={handlePrint}
                  disabled={!trailerNumber || !temperature}
                >
                  Print Temp-Check
                </button>
              </>
            )}

            {/* ---------------- BOL FIELDS ---------------- */}
            {docType === "BOL" && (
              <>
                <h3>BOL Details</h3>

                <label className="form-field">
                  <span>Seal Number</span>
                  <input
                    value={sealNumber}
                    onChange={(e) => setSealNumber(e.target.value)}
                  />
                </label>

                <label className="form-field">
                  <span>Qty (Totes)</span>
                  <input
                    type="number"
                    value={qty}
                    onChange={(e) => setQty(e.target.value)}
                  />
                </label>

                <div className="form-note">
                  BOL No: <strong>{bolNumber}</strong>
                </div>

                <button
                  className="print-button"
                  onClick={handlePrint}
                  disabled={!trailerNumber || !sealNumber || !qty}
                >
                  Print BOL
                </button>
              </>
            )}
          </div>
        </div>

        {/* RIGHT SIDE — preview */}
        <div className="right-panel">
          <h2>Print Preview</h2>

          <PrintLayout
            activePreview={activePreview}
            bolTemplateType={bolTemplateType}
            trailerNumber={trailerNumber}
            sealNumber={sealNumber}
            qty={qty}
            bolNumber={bolNumber}
            supervisorName={supervisorName}
            initials={initials}
            checks={checks}
            issueTexts={issueTexts}
            temperature={temperature}
          />
        </div>
      </div>
    </div>
  );
}

export default App;
