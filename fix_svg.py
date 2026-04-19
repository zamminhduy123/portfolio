import re

svg_content = """
      <!-- Background -->
      <rect width="100%" height="100%" fill="url(#grid)"/>

      <!-- ===== ZONES ===== -->

      <!-- Docker Compose boundary -->
      <rect x="215" y="30" width="870" height="760" rx="12"
            fill="rgba(251,191,36,0.04)" stroke="#fbbf24" stroke-width="1" stroke-dasharray="8,4"/>
      <text x="228" y="50" fill="#fbbf24" font-size="10" font-weight="600" font-family="JetBrains Mono">🐳 Docker Compose Stack</text>

      <!-- FastAPI app internal boundary -->
      <rect x="390" y="155" width="370" height="105" rx="8"
            fill="rgba(6,78,59,0.08)" stroke="#34d399" stroke-width="1" stroke-dasharray="4,4"/>
      <text x="400" y="170" fill="#34d399" font-size="9" font-family="JetBrains Mono">FastAPI Application (main.py · uvicorn)</text>

      <!-- Agents zone -->
      <rect x="450" y="295" width="290" height="100" rx="8"
            fill="rgba(6,78,59,0.06)" stroke="#34d399" stroke-width="1" stroke-dasharray="4,4"/>
      <text x="460" y="310" fill="#34d399" font-size="9" font-family="JetBrains Mono">agents/</text>

      <!-- Services zone -->
      <rect x="450" y="500" width="390" height="90" rx="8"
            fill="rgba(6,78,59,0.06)" stroke="#34d399" stroke-width="1" stroke-dasharray="4,4"/>
      <text x="460" y="515" fill="#34d399" font-size="9" font-family="JetBrains Mono">services/</text>

      <!-- LLM zone -->
      <rect x="225" y="385" width="200" height="100" rx="8"
            fill="rgba(120,53,15,0.06)" stroke="#fbbf24" stroke-width="1" stroke-dasharray="4,4"/>
      <text x="236" y="402" fill="#fbbf24" font-size="9" font-family="JetBrains Mono">llm/ (factory + providers)</text>

      <!-- Cloud External boundary -->
      <rect x="225" y="605" width="810" height="200" rx="12"
            fill="rgba(30,41,59,0.15)" stroke="#94a3b8" stroke-width="1" stroke-dasharray="6,4"/>
      <text x="236" y="625" fill="#94a3b8" font-size="9" font-weight="600" font-family="JetBrains Mono">☁️ External Cloud Services</text>

      <!-- ===== ARROWS (drawn first, behind boxes) ===== -->

      <!-- User → Telegram API -->
      <line x1="70" y1="115" x2="70" y2="178" stroke="#94a3b8" stroke-width="1.5" marker-end="url(#arr)"/>
      <text x="75" y="155" fill="#94a3b8" font-size="8" font-family="JetBrains Mono">sends msg</text>

      <!-- Telegram API → ngrok (webhook POST) -->
      <line x1="130" y1="207" x2="195" y2="207" stroke="#22d3ee" stroke-width="1.5" marker-end="url(#arr-cyan)"/>
      <text x="162" y="200" fill="#22d3ee" font-size="8" font-family="JetBrains Mono" text-anchor="middle">POST /webhook</text>

      <!-- ngrok → FastAPI app -->
      <line x1="310" y1="207" x2="400" y2="207" stroke="#22d3ee" stroke-width="1.5" marker-end="url(#arr-cyan)"/>
      <text x="355" y="200" fill="#94a3b8" font-size="8" font-family="JetBrains Mono" text-anchor="middle">forward</text>

      <!-- FastAPI → Librarian Agent (from webhook.py to librarian.py) -->
      <line x1="442" y1="248" x2="520" y2="318" stroke="#34d399" stroke-width="1.5" marker-end="url(#arr-green)"/>
      <circle cx="481" cy="283" r="9" fill="#22d3ee" opacity="0.15" stroke="#22d3ee" stroke-width="1"/>
      <text x="481" y="286" fill="#22d3ee" font-size="7.5" font-weight="700" text-anchor="middle" font-family="JetBrains Mono">①</text>

      <!-- FastAPI → Researcher Agent (from query.py to researcher.py) -->
      <line x1="535" y1="248" x2="660" y2="318" stroke="#34d399" stroke-width="1.5" marker-end="url(#arr-green)"/>
      <circle cx="597" cy="283" r="9" fill="#34d399" opacity="0.15" stroke="#34d399" stroke-width="1"/>
      <text x="597" y="286" fill="#34d399" font-size="7.5" font-weight="700" text-anchor="middle" font-family="JetBrains Mono">②</text>

      <!-- Librarian → LLM Factory -->
      <path d="M 460 347 L 385 413" fill="none" stroke="#a78bfa" stroke-width="1.5" marker-end="url(#arr-violet)"/>
      <circle cx="422" cy="380" r="9" fill="#a78bfa" opacity="0.15" stroke="#a78bfa" stroke-width="1"/>
      <text x="422" y="383" fill="#a78bfa" font-size="7.5" font-weight="700" text-anchor="middle" font-family="JetBrains Mono">③</text>

      <!-- Researcher → LLM Factory -->
      <path d="M 600 365 Q 480 400 385 435" fill="none" stroke="#a78bfa" stroke-width="1.5" marker-end="url(#arr-violet)"/>
      <circle cx="520" cy="397" r="9" fill="#34d399" opacity="0.15" stroke="#34d399" stroke-width="1"/>
      <text x="520" y="400" fill="#34d399" font-size="7.5" font-weight="700" text-anchor="middle" font-family="JetBrains Mono">④</text>

      <!-- LLM Factory → Gemini -->
      <line x1="290" y1="463" x2="285" y2="640" stroke="#fbbf24" stroke-width="1.5" stroke-dasharray="5,3" marker-end="url(#arr-amber)"/>

      <!-- LLM Factory → Ollama -->
      <line x1="360" y1="463" x2="400" y2="640" stroke="#fbbf24" stroke-width="1.5" stroke-dasharray="5,3" marker-end="url(#arr-amber)"/>

      <!-- Librarian → GitHub Service -->
      <line x1="580" y1="347" x2="740" y2="425" stroke="#34d399" stroke-width="1.5" marker-end="url(#arr-green)"/>

      <!-- Researcher → GitHub Service -->
      <line x1="720" y1="360" x2="780" y2="410" stroke="#34d399" stroke-width="1.5" marker-end="url(#arr-green)"/>
      <circle cx="750" cy="385" r="9" fill="#34d399" opacity="0.15" stroke="#34d399" stroke-width="1"/>
      <text x="750" y="388" fill="#34d399" font-size="7.5" font-weight="700" text-anchor="middle" font-family="JetBrains Mono">⑤</text>

      <!-- GitHub Service → GitHub API (cloud) -->
      <line x1="805" y1="468" x2="940" y2="640" stroke="#fbbf24" stroke-width="1.5" stroke-dasharray="5,3" marker-end="url(#arr-amber)"/>
      <circle cx="872" cy="554" r="9" fill="#fbbf24" opacity="0.15" stroke="#fbbf24" stroke-width="1"/>
      <text x="872" y="557" fill="#fbbf24" font-size="7.5" font-weight="700" text-anchor="middle" font-family="JetBrains Mono">⑥</text>

      <!-- FastAPI → Telegram Service -->
      <path d="M 430 260 L 430 540 L 458 540" fill="none" stroke="#22d3ee" stroke-width="1" stroke-dasharray="4,3" marker-end="url(#arr-cyan)"/>

      <!-- Telegram Service → Telegram API (startup webhook set) -->
      <path d="M 515 580 L 515 600 L 180 600 L 180 220 L 130 220" fill="none" stroke="#22d3ee" stroke-width="1" stroke-dasharray="4,3" marker-end="url(#arr-cyan)"/>

      <!-- Document Service → Librarian -->
      <line x1="639" y1="528" x2="520" y2="376" stroke="#34d399" stroke-width="1" stroke-dasharray="4,3" marker-end="url(#arr-green)"/>

      <!-- ===== COMPONENTS ===== -->

      <!-- USER -->
      <rect x="20" y="60" width="100" height="55" rx="6" fill="#0f172a"/>
      <rect x="20" y="60" width="100" height="55" rx="6" fill="rgba(30,41,59,0.5)" stroke="#94a3b8" stroke-width="1.5"/>
      <text x="70" y="83" fill="white" font-size="11" font-weight="600" text-anchor="middle" font-family="JetBrains Mono">👤 User</text>
      <text x="70" y="100" fill="#94a3b8" font-size="9" text-anchor="middle" font-family="JetBrains Mono">Telegram App</text>

      <!-- Telegram API (external left) -->
      <rect x="20" y="178" width="110" height="58" rx="6" fill="#0f172a"/>
      <rect x="20" y="178" width="110" height="58" rx="6" fill="rgba(30,41,59,0.5)" stroke="#94a3b8" stroke-width="1.5"/>
      <text x="75" y="200" fill="white" font-size="10" font-weight="600" text-anchor="middle" font-family="JetBrains Mono">Telegram API</text>
      <text x="75" y="216" fill="#94a3b8" font-size="8" text-anchor="middle" font-family="JetBrains Mono">api.telegram.org</text>
      <text x="75" y="228" fill="#22d3ee" font-size="7" text-anchor="middle" font-family="JetBrains Mono">Webhook · Bot API</text>

      <!-- ngrok container -->
      <rect x="195" y="178" width="115" height="58" rx="6" fill="#0f172a"/>
      <rect x="195" y="178" width="115" height="58" rx="6" fill="rgba(120,53,15,0.3)" stroke="#fbbf24" stroke-width="1.5"/>
      <text x="252" y="201" fill="white" font-size="10" font-weight="600" text-anchor="middle" font-family="JetBrains Mono">ngrok</text>
      <text x="252" y="216" fill="#94a3b8" font-size="8" text-anchor="middle" font-family="JetBrains Mono">HTTPS Tunnel</text>
      <text x="252" y="228" fill="#fbbf24" font-size="7" text-anchor="middle" font-family="JetBrains Mono">domain.ngrok-free.app</text>

      <!-- Routers row inside FastAPI box -->
      <!-- webhook.py -->
      <rect x="400" y="178" width="85" height="70" rx="5" fill="#0f172a"/>
      <rect x="400" y="178" width="85" height="70" rx="5" fill="rgba(6,78,59,0.4)" stroke="#34d399" stroke-width="1.5"/>
      <text x="442" y="198" fill="white" font-size="9" font-weight="600" text-anchor="middle" font-family="JetBrains Mono">webhook.py</text>
      <text x="442" y="212" fill="#94a3b8" font-size="7.5" text-anchor="middle" font-family="JetBrains Mono">POST /webhook</text>
      <text x="442" y="224" fill="#94a3b8" font-size="7.5" text-anchor="middle" font-family="JetBrains Mono">/telegram</text>
      <text x="442" y="239" fill="#34d399" font-size="7" text-anchor="middle" font-family="JetBrains Mono">BackgroundTask</text>

      <!-- query.py -->
      <rect x="495" y="178" width="80" height="70" rx="5" fill="#0f172a"/>
      <rect x="495" y="178" width="80" height="70" rx="5" fill="rgba(6,78,59,0.4)" stroke="#34d399" stroke-width="1.5"/>
      <text x="535" y="198" fill="white" font-size="9" font-weight="600" text-anchor="middle" font-family="JetBrains Mono">query.py</text>
      <text x="535" y="212" fill="#94a3b8" font-size="7.5" text-anchor="middle" font-family="JetBrains Mono">POST /query</text>
      <text x="535" y="224" fill="#94a3b8" font-size="7.5" text-anchor="middle" font-family="JetBrains Mono">REST JSON</text>
      <text x="535" y="239" fill="#34d399" font-size="7" text-anchor="middle" font-family="JetBrains Mono">Researcher</text>

      <!-- ws_query.py -->
      <rect x="582" y="178" width="80" height="70" rx="5" fill="#0f172a"/>
      <rect x="582" y="178" width="80" height="70" rx="5" fill="rgba(6,78,59,0.4)" stroke="#34d399" stroke-width="1.5"/>
      <text x="622" y="198" fill="white" font-size="9" font-weight="600" text-anchor="middle" font-family="JetBrains Mono">ws_query.py</text>
      <text x="622" y="212" fill="#94a3b8" font-size="7.5" text-anchor="middle" font-family="JetBrains Mono">WS /ws/query</text>
      <text x="622" y="224" fill="#94a3b8" font-size="7.5" text-anchor="middle" font-family="JetBrains Mono">Streaming</text>
      <text x="622" y="239" fill="#34d399" font-size="7" text-anchor="middle" font-family="JetBrains Mono">Real-time</text>

      <!-- lint.py -->
      <rect x="669" y="178" width="80" height="70" rx="5" fill="#0f172a"/>
      <rect x="669" y="178" width="80" height="70" rx="5" fill="rgba(6,78,59,0.4)" stroke="#34d399" stroke-width="1.5"/>
      <text x="709" y="198" fill="white" font-size="9" font-weight="600" text-anchor="middle" font-family="JetBrains Mono">lint.py</text>
      <text x="709" y="212" fill="#94a3b8" font-size="7.5" text-anchor="middle" font-family="JetBrains Mono">POST /lint</text>
      <text x="709" y="224" fill="#94a3b8" font-size="7.5" text-anchor="middle" font-family="JetBrains Mono">Wiki audit</text>
      <text x="709" y="239" fill="#34d399" font-size="7" text-anchor="middle" font-family="JetBrains Mono">Maintenance</text>

      <!-- Librarian Agent -->
      <rect x="460" y="318" width="120" height="58" rx="6" fill="#0f172a"/>
      <rect x="460" y="318" width="120" height="58" rx="6" fill="rgba(6,78,59,0.4)" stroke="#34d399" stroke-width="1.5"/>
      <text x="520" y="340" fill="white" font-size="10" font-weight="600" text-anchor="middle" font-family="JetBrains Mono">librarian.py</text>
      <text x="520" y="354" fill="#94a3b8" font-size="8" text-anchor="middle" font-family="JetBrains Mono">Call 1: route_and_select</text>
      <text x="520" y="367" fill="#94a3b8" font-size="8" text-anchor="middle" font-family="JetBrains Mono">Call 2: compile_updates</text>

      <!-- Researcher Agent -->
      <rect x="600" y="318" width="120" height="58" rx="6" fill="#0f172a"/>
      <rect x="600" y="318" width="120" height="58" rx="6" fill="rgba(6,78,59,0.4)" stroke="#34d399" stroke-width="1.5"/>
      <text x="660" y="340" fill="white" font-size="10" font-weight="600" text-anchor="middle" font-family="JetBrains Mono">researcher.py</text>
      <text x="660" y="354" fill="#94a3b8" font-size="8" text-anchor="middle" font-family="JetBrains Mono">Call 1: navigate</text>
      <text x="660" y="367" fill="#94a3b8" font-size="8" text-anchor="middle" font-family="JetBrains Mono">Call 2: synthesise</text>

      <!-- LLM Factory -->
      <rect x="250" y="405" width="135" height="58" rx="6" fill="#0f172a"/>
      <rect x="250" y="405" width="135" height="58" rx="6" fill="rgba(120,53,15,0.3)" stroke="#fbbf24" stroke-width="1.5"/>
      <text x="317" y="425" fill="white" font-size="10" font-weight="600" text-anchor="middle" font-family="JetBrains Mono">llm/factory.py</text>
      <text x="317" y="440" fill="#94a3b8" font-size="8" text-anchor="middle" font-family="JetBrains Mono">get_provider()</text>
      <text x="317" y="452" fill="#fbbf24" font-size="7" text-anchor="middle" font-family="JetBrains Mono">LLM_PROVIDER env</text>

      <!-- GitHub Service -->
      <rect x="740" y="410" width="130" height="58" rx="6" fill="#0f172a"/>
      <rect x="740" y="410" width="130" height="58" rx="6" fill="rgba(6,78,59,0.4)" stroke="#34d399" stroke-width="1.5"/>
      <text x="805" y="433" fill="white" font-size="10" font-weight="600" text-anchor="middle" font-family="JetBrains Mono">github_service.py</text>
      <text x="805" y="447" fill="#94a3b8" font-size="8" text-anchor="middle" font-family="JetBrains Mono">PyGithub · Git Data API</text>
      <text x="805" y="460" fill="#34d399" font-size="7" text-anchor="middle" font-family="JetBrains Mono">batch_commit() · atomic</text>

      <!-- Services row -->
      <!-- telegram_service.py -->
      <rect x="458" y="528" width="115" height="52" rx="5" fill="#0f172a"/>
      <rect x="458" y="528" width="115" height="52" rx="5" fill="rgba(6,78,59,0.4)" stroke="#34d399" stroke-width="1.5"/>
      <text x="515" y="548" fill="white" font-size="9" font-weight="600" text-anchor="middle" font-family="JetBrains Mono">telegram_service</text>
      <text x="515" y="562" fill="#94a3b8" font-size="8" text-anchor="middle" font-family="JetBrains Mono">send_message</text>
      <text x="515" y="573" fill="#94a3b8" font-size="8" text-anchor="middle" font-family="JetBrains Mono">set_webhook · httpx</text>

      <!-- document_service.py -->
      <rect x="582" y="528" width="115" height="52" rx="5" fill="#0f172a"/>
      <rect x="582" y="528" width="115" height="52" rx="5" fill="rgba(6,78,59,0.4)" stroke="#34d399" stroke-width="1.5"/>
      <text x="639" y="548" fill="white" font-size="9" font-weight="600" text-anchor="middle" font-family="JetBrains Mono">document_service</text>
      <text x="639" y="562" fill="#94a3b8" font-size="8" text-anchor="middle" font-family="JetBrains Mono">extract_text()</text>
      <text x="639" y="573" fill="#94a3b8" font-size="8" text-anchor="middle" font-family="JetBrains Mono">PDF→MD · condense</text>

      <!-- ===== EXTERNAL CLOUD ===== -->

      <!-- Google Gemini -->
      <rect x="230" y="640" width="110" height="60" rx="6" fill="#0f172a"/>
      <rect x="230" y="640" width="110" height="60" rx="6" fill="rgba(120,53,15,0.3)" stroke="#fbbf24" stroke-width="1.5"/>
      <text x="285" y="662" fill="white" font-size="10" font-weight="600" text-anchor="middle" font-family="JetBrains Mono">Google Gemini</text>
      <text x="285" y="677" fill="#94a3b8" font-size="8" text-anchor="middle" font-family="JetBrains Mono">google-genai SDK</text>
      <text x="285" y="690" fill="#fbbf24" font-size="7" text-anchor="middle" font-family="JetBrains Mono">structured JSON output</text>

      <!-- Ollama -->
      <rect x="350" y="640" width="100" height="60" rx="6" fill="#0f172a"/>
      <rect x="350" y="640" width="100" height="60" rx="6" fill="rgba(120,53,15,0.3)" stroke="#fbbf24" stroke-width="1.5"/>
      <text x="400" y="662" fill="white" font-size="10" font-weight="600" text-anchor="middle" font-family="JetBrains Mono">Ollama</text>
      <text x="400" y="677" fill="#94a3b8" font-size="8" text-anchor="middle" font-family="JetBrains Mono">local LLM</text>
      <text x="400" y="690" fill="#fbbf24" font-size="7" text-anchor="middle" font-family="JetBrains Mono">host.docker.internal</text>

      <!-- GitHub API -->
      <rect x="895" y="640" width="130" height="60" rx="6" fill="#0f172a"/>
      <rect x="895" y="640" width="130" height="60" rx="6" fill="rgba(120,53,15,0.3)" stroke="#fbbf24" stroke-width="1.5"/>
      <text x="960" y="662" fill="white" font-size="10" font-weight="600" text-anchor="middle" font-family="JetBrains Mono">GitHub API</text>
      <text x="960" y="677" fill="#94a3b8" font-size="8" text-anchor="middle" font-family="JetBrains Mono">api.github.com</text>
      <text x="960" y="690" fill="#fbbf24" font-size="7" text-anchor="middle" font-family="JetBrains Mono">Git Data API · PAT auth</text>

      <!-- GitHub Wiki Repo -->
      <rect x="850" y="730" width="220" height="75" rx="6" fill="#0f172a"/>
      <rect x="850" y="730" width="220" height="75" rx="6" fill="rgba(76,29,149,0.4)" stroke="#a78bfa" stroke-width="1.5"/>
      <text x="960" y="753" fill="white" font-size="10" font-weight="600" text-anchor="middle" font-family="JetBrains Mono">GitHub Wiki Repo</text>
      <text x="960" y="768" fill="#94a3b8" font-size="8" text-anchor="middle" font-family="JetBrains Mono">wiki/ · sources/ · entities/</text>
      <text x="960" y="780" fill="#94a3b8" font-size="8" text-anchor="middle" font-family="JetBrains Mono">concepts/ · analyses/ · log.md</text>
      <text x="960" y="795" fill="#a78bfa" font-size="7" text-anchor="middle" font-family="JetBrains Mono">Structured Markdown • Atomic Commits</text>

      <!-- GitHub API → Wiki Repo -->
      <line x1="960" y1="700" x2="960" y2="730" stroke="#a78bfa" stroke-width="1.5" marker-end="url(#arr-violet)"/>
      <text x="968" y="718" fill="#94a3b8" font-size="8" font-family="JetBrains Mono">read/write</text>

      <!-- ===== LEGEND ===== -->
      <text x="30" y="445" fill="white" font-size="10" font-weight="600" font-family="JetBrains Mono">Legend</text>
      <rect x="30" y="455" width="14" height="10" rx="2" fill="rgba(6,78,59,0.4)" stroke="#34d399" stroke-width="1"/>
      <text x="50" y="463" fill="#94a3b8" font-size="8" font-family="JetBrains Mono">Backend / Agent</text>
      <rect x="30" y="472" width="14" height="10" rx="2" fill="rgba(120,53,15,0.3)" stroke="#fbbf24" stroke-width="1"/>
      <text x="50" y="480" fill="#94a3b8" font-size="8" font-family="JetBrains Mono">Cloud / Infra</text>
      <rect x="30" y="489" width="14" height="10" rx="2" fill="rgba(76,29,149,0.4)" stroke="#a78bfa" stroke-width="1"/>
      <text x="50" y="497" fill="#94a3b8" font-size="8" font-family="JetBrains Mono">Data/Storage</text>
      <rect x="30" y="506" width="14" height="10" rx="2" fill="rgba(30,41,59,0.5)" stroke="#94a3b8" stroke-width="1"/>
      <text x="50" y="514" fill="#94a3b8" font-size="8" font-family="JetBrains Mono">External User/API</text>
      <line x1="30" y1="528" x2="44" y2="528" stroke="#94a3b8" stroke-width="1.5"/>
      <text x="50" y="531" fill="#94a3b8" font-size="8" font-family="JetBrains Mono">Sync call</text>
      <line x1="30" y1="543" x2="44" y2="543" stroke="#94a3b8" stroke-width="1" stroke-dasharray="4,3"/>
      <text x="50" y="546" fill="#94a3b8" font-size="8" font-family="JetBrains Mono">Async / startup</text>
"""
import sys
with open("/Users/rzy/Desktop/ProjectWithTien/Web/Personal Portfolio Website UI/public/backend.html", "r") as f:
    text = f.read()

prefix = text.split("<!-- Background -->")[0]
suffix = text.split("</svg>")[1]

new_text = prefix + svg_content + "\n    </svg>\n" + suffix

with open("/Users/rzy/Desktop/ProjectWithTien/Web/Personal Portfolio Website UI/public/backend.html", "w") as f:
    f.write(new_text)

print("Replaced!")
