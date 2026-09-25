# Self-Hosting

Status: Planned. Introduced: P0. Release gate: P5. Actor: self-host operator. Depends on FR-REPO-007 and FR-REPO-008. Applicable constraints: NFR-PORT-001, NFR-PORT-002, and NFR-PORT-004.

### FR-HOST-001 — Local run
The application shall run locally from documented steps. Done when a fresh clone follows the guide to a working application.

### FR-HOST-002 — No commercial service requirement
The application shall not require commercial LangStride services. Done when all core learning functions operate with the supported local/self-host configuration only.

### FR-HOST-003 — Host-controlled data
Self-hosted data shall remain under host control. Done when the deployment guide identifies host-managed persistent stores and contains no required export to LangStride.

### FR-HOST-004 — Non-commercial deployment guide
A non-commercial deployment guide shall be provided. Done when an operator can deploy for a permitted non-commercial use under the repository license.

### FR-HOST-005 — Docker startup
Docker-based startup should be available. Done when documented Docker steps start the supported application and its required local dependencies.

### FR-HOST-006 — Community/education hosting
A hosted instance should support free community or education use subject to the license. Done when the guide describes the supported non-commercial operating boundary without granting rights beyond the license.

### FR-REPO-012 — Non-commercial self-host documentation
Non-commercial self-hosting shall be supported by documentation. Done when the deployment guide explains the supported non-commercial path and links to the controlling license.
