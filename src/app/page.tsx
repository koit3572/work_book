import Container from "@/components/Container";
import Link from "next/link";

export default function Home() {
  return (
    <Container>
      <Link href="/work_book">학습 시작하기</Link>
    </Container>
  );
}
