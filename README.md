<div align="center">

![TveitTheGhost — Building with AI, thinking like a defender](https://raw.githubusercontent.com/TveitTheGhost/TveitTheGhost/main/banner.svg)

<br>

**IT engineer moving deep into defensive security.**
I build detection-as-code, cloud-security tooling, and purple-team labs — then I test whether they actually work.

<br>

`detection engineering` &nbsp;·&nbsp; `SIEM & Sigma` &nbsp;·&nbsp; `MITRE ATT&CK` &nbsp;·&nbsp; `threat intel` &nbsp;·&nbsp; `cloud security` &nbsp;·&nbsp; `purple teaming`

</div>

---

### `>` whoami

I come from an IT background and I'm specializing into **detection engineering** — the discipline of writing, testing, and tuning the rules that decide whether an intrusion is ever seen. I treat detections like production code: version-controlled, unit-tested, and validated by actually running the attack they're meant to catch.

My work lives in private repositories while I build it out. This profile is the public-facing summary of the direction and the craft.

---

### `>` what I focus on

| Area | What that means in practice |
| :-- | :-- |
| 🛡️ **Detection Engineering** | Sigma rules as tested code — every rule ships with true-positive *and* true-negative fixtures, converted to Splunk, Sentinel & Defender. |
| 🟣 **Purple Teaming** | Emulate an ATT&CK technique, capture the telemetry, and *prove* the detection fired — validated coverage, not assumed coverage. |
| ☁️ **Cloud Security** | Attack-path analysis and IAM privilege-escalation hunting; infrastructure-as-code labs with cost & exposure guardrails baked in. |
| 🔎 **Threat Intelligence** | Turning raw threat reports into structured, de-fanged indicators and ATT&CK techniques — the intel that informs new detections. |
| 🤖 **Security + AI** | Using AI to move faster without cutting corners — and keeping a human in the loop wherever a wrong answer would matter. |

---

### `>` flagship — GhostSOC

**An integrated Security Operations Console that runs the whole toolkit against one
synthetic intrusion — with live, click-to-triage alerts.** Press *Run scenario* and
a fabricated multi-stage attack ("GhostBear") unfolds across every tool: phishing →
password spray → endpoint execution → C2 beaconing → DNS exfil → web attack → cloud
pivot. Each real tool fires, every finding normalizes into one alert model, the
kill chain lights up, and ATT&CK coverage scores in real time. Localhost-only, zero
network egress, 100% synthetic data — safe to run, and the one artifact that shows
all these tools working *together*.

---

### `>` arsenal

Twenty tools, grouped by what they do — now spanning **Python, PowerShell, and Node.js**. Repositories are private while the collection matures — happy to walk through any of them (or demo GhostSOC live) on request.

**🛡️ Detection & Coverage**
| Project | What it does |
| :-- | :-- |
| **detection-pipeline** | Detection-as-code: 20+ Sigma rules as unit-tested software, auto-converted to Splunk, Sentinel & Defender. |
| **attack-coverage** | Threat-informed gap analysis — which of an adversary's ATT&CK techniques you *can't* see, as a Navigator heatmap. |
| **sigma-linter** | Grades detection rules A–F on quality, ATT&CK mapping, and breadth — keeps the rule library healthy. |
| **kql-linter** | Catches broken or dangerously-broad SIEM queries (KQL/SPL) before they ship. |
| **sigma-arsenal** | A CI-validated Sigma rule library across Windows/Linux/cloud/web — every rule gated on ATT&CK mapping & quality. |

**🔎 Threat Intel & Incident Response**
| Project | What it does |
| :-- | :-- |
| **ioc-extractor** | Turns a threat report into clean, de-fanged indicators + ATT&CK techniques. |
| **log-normalizer** | Mixed, messy logs of any shape → one clean, ECS-aligned schema. |
| **incident-timeline** | Normalized events → a reconstructed timeline that flags attack sequences. |
| **email-header-analyzer** | Flags phishing by the email's headers — SPF/DKIM/DMARC, spoofing, look-alikes. |

**🕵️ Threat Detection**
| Project | What it does |
| :-- | :-- |
| **beacon-detector** | Finds malware C2 by spotting regular-interval traffic — behavioral, no signatures. |
| **dns-exfil-detector** | Catches data smuggled through DNS via subdomain entropy + volume. |
| **password-spray-detector** | Detects spraying — few attempts across many accounts, under the lockout radar. |
| **weblog-attack-detector** | WAF-lite: scans web logs for SQLi, XSS, traversal, LFI, cmd injection & scanners. |

**🟣 Offense & Validation**
| Project | What it does |
| :-- | :-- |
| **purple-harness** | Emulates ATT&CK techniques and proves the matching detection fired — a validated proof chain. |
| **attack-range** | Instrumented lab-as-code: free local Docker range + a guardrailed AWS Terraform range that can't overspend or expose itself. |
| **iam-pathfinder** | Finds AWS IAM privilege-escalation paths by graph traversal — the chains that quietly lead to admin. |

**☁️ Cloud & Malware**
| Project | What it does |
| :-- | :-- |
| **cloud-audit** | CSPM-lite — scans an AWS account for public buckets, open ports, MFA gaps & more, each with a fix. |
| **yara-tester** | Write malware-detection signatures *and unit-test them* — a dependency-free YARA-subset engine. |

**🧱 Hardening & AppSec**
| Project | What it does |
| :-- | :-- |
| **win-hardening-audit** | Read-only Windows hardening auditor (PowerShell) — grades a host A–F against a CIS-style baseline. No data collected. |
| **header-hawk** | Offline HTTP security-header analyzer (Node.js) — grades HSTS/CSP/cookies A–F, zero dependencies. |

<sub>One coherent loop: **intel → detection → attack → validation**, on infrastructure built to be safe by default. Every tool ships with tests, CI, and a "what it does *not* do" section.</sub>

---

### `>` toolbox

![Python](https://img.shields.io/badge/Python-0b1220?style=for-the-badge&logo=python&logoColor=22d3ee)
![Sigma](https://img.shields.io/badge/Sigma_Rules-0b1220?style=for-the-badge&logo=elastic&logoColor=34d399)
![Splunk](https://img.shields.io/badge/Splunk-0b1220?style=for-the-badge&logo=splunk&logoColor=22d3ee)
![Sentinel](https://img.shields.io/badge/Microsoft_Sentinel-0b1220?style=for-the-badge&logo=microsoftazure&logoColor=34d399)
![MITRE ATT&CK](https://img.shields.io/badge/MITRE_ATT%26CK-0b1220?style=for-the-badge&logo=mitre&logoColor=22d3ee)

![AWS](https://img.shields.io/badge/AWS-0b1220?style=for-the-badge&logo=amazonwebservices&logoColor=34d399)
![Terraform](https://img.shields.io/badge/Terraform-0b1220?style=for-the-badge&logo=terraform&logoColor=8b5cf6)
![Docker](https://img.shields.io/badge/Docker-0b1220?style=for-the-badge&logo=docker&logoColor=22d3ee)
![Git](https://img.shields.io/badge/Git-0b1220?style=for-the-badge&logo=git&logoColor=34d399)
![Linux](https://img.shields.io/badge/Linux-0b1220?style=for-the-badge&logo=linux&logoColor=22d3ee)

---

### `>` currently

```text
[ in progress ]  Studying for CompTIA Security+
[ building    ]  17 tools + GhostSOC, the console that runs them all — each tested end to end
[ learning    ]  Deeper SIEM query fluency (SPL / KQL) and cloud attack paths
[ mindset     ]  A false positive wastes an analyst's day; a false negative ends a company's.
                 Build for both.
```

---

<div align="center">

*"Only projects I choose to share ever go public. Repository links are always deliberate."*

<sub>Defensive security · detection-as-code · built in the open when it's ready</sub>

</div>
