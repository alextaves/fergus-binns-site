import { ImageResponse } from 'next/og'

export const size = { width: 32, height: 32 }
export const contentType = 'image/png'

export default async function Icon() {
  const font = await fetch(
    'https://fonts.gstatic.com/s/ebgaramond/v26/SlGDmQSNjdsmc35JDF1K5E55YMjF_7DPuGi-6_RUA4V-e6yHgQ.woff2'
  ).then((res) => res.arrayBuffer())

  return new ImageResponse(
    (
      <div
        style={{
          width: 32,
          height: 32,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'white',
        }}
      >
        <span
          style={{
            fontFamily: 'EB Garamond',
            fontSize: 24,
            color: '#7a7a7a',
            lineHeight: 1,
          }}
        >
          F
        </span>
      </div>
    ),
    {
      ...size,
      fonts: [
        {
          name: 'EB Garamond',
          data: font,
          style: 'normal',
        },
      ],
    }
  )
}
