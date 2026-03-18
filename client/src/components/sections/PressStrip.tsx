const eventTypes = [
  'Weddings',
  'Corporate Events',
  'Galas & Fundraisers',
  'Destination Events',
  'Quinceañeras',
  'Social Celebrations',
  'Anniversaries',
  'Mitzvahs',
]

export function PressStrip() {
  const items = [...eventTypes, ...eventTypes]

  return (
    <section className="border-y border-border py-4 overflow-hidden">
      <div className="press-ticker flex whitespace-nowrap">
        {items.map((item, i) => (
          <span
            key={`${item}-${i}`}
            className="inline-flex items-center px-8 font-body text-[0.6875rem] tracking-[0.2em] uppercase text-warm-gray"
          >
            {item}
            <span className="ml-8 text-gold">&#9830;</span>
          </span>
        ))}
      </div>
    </section>
  )
}
