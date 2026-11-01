import Esp32App from '../../components/Esp32App';
import { LANGUAGES } from '../../ui/app';

export function generateStaticParams() {
  return LANGUAGES.filter((l: any) => l.code !== 'en').map((l: any) => ({
    lang: l.code,
  }));
}

export default async function LangPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  return <Esp32App lang={lang} />;
}
