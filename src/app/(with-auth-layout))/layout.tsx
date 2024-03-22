export default function AuthLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div>
            <h3>Inner Layout</h3>
            {children}
        </div>
    )
}