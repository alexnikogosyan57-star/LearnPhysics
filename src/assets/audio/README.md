# Local interface effects

## Sound Assets & Mappings
1. **control.ogg** (Kenney CC0): Control rotation / toggle sound.
2. **complete.ogg** (Kenney CC0): Investigation completion jingle.
3. **duolingo-correct.mp3**: Uplifting two-tone major chime (C5 -> G5) triggered upon validating a hypothesis or answering a checkpoint question correctly.
4. **duolingo-wrong.mp3**: Friendly, soft descending non-punitive tone triggered when a prediction or quiz answer needs review.
5. **duolingo-complete.mp3**: Celebratory lesson / unit completion fanfare.
6. **duolingo-streak.mp3**: Ascending pentatonic chime flourish for streak milestones and star achievements.
7. **duolingo-tap.mp3**: Organic tactile bubble pop for interactive card selections, radio choices, and slider movements.
8. **duolingo-hint.mp3**: Gentle inquisitive bell chime when activating robot tutoring hints or opening formula guides.

All sounds are stored locally, bundled offline by `scripts/export-standalone.py` as inlined data URIs, and only play after explicit sound activation by the user.
