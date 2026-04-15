const eventTypes = [
  'Custom Invitations',
  'Weddings',
  'Birthdays',
  'Bridal Showers',
  'Baby Showers',
  'Anniversaries',
  'Corporate Events',
  'Social Celebrations',
  'Event Design & Styling',
  'Workshops & Courses',
]

export function PressStrip() {
  const items = [...eventTypes, ...eventTypes]

  return (
    <section className="border-y border-border py-4 overflow-hidden">
      <div className="press-ticker flex whitespace-nowrap">
        {items.map((item, i) => (
          <span
            key={`${item}-${i}`}
            className="inline-flex items-center px-8 font-body text-[0.6875rem] tracking-[0.2em] uppercase text-taupe"
          >
            {item}
            <span className="ml-8 text-sage">&#9830;</span>
          </span>
        ))}
      </div>
    </section>
  )
}
