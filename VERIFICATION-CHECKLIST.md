# My Personal Board — Verification Checklist

## Green path

1. **Install & run**
   - `npm install` ✓
   - `npm run dev` ✓
   - Open http://localhost:5173 (or the port Vite shows)

2. **Visual & UX**
   - [ ] Hero: full-screen, “My Personal Board” large serif, “Wellness • Music • Embodiment” in script
   - [ ] Scroll feels cinematic (gentle parallax, no jank)
   - [ ] Two-column layout on large screens: left = Mission + Initiative, right = Dream Team cards
   - [ ] Cards use glassmorphism (subtle blur, light border), staggered reveal on scroll
   - [ ] Hovers feel smooth (no harsh jumps)
   - [ ] Typography: serif headings, humanist sans body, generous line-height
   - [ ] Musical staff overlay: very faint lines in background
   - [ ] “Yes!” script accent visible near left column content
   - [ ] Nav: top-right — Back to top + light/dark toggle

3. **Content**
   - [ ] All copy unchanged: mission, initiative, roles, community vision, team members (role, person, superpowers, why), footer line, “Create with integrity” etc.

4. **Technical**
   - [ ] No layout shift (CLS): fonts preloaded in `index.html`
   - [ ] Interactive elements have `data-testid` where specified
   - [ ] Mobile: layout stacks, touch targets adequate

5. **Build**
   - `npm run build` — completes without errors
   - `npm run preview` — production build runs locally
