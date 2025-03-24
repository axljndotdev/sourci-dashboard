
const Footer = () => {
  return (
    <footer style={{
      position: 'fixed',
      bottom: 0,
      width: '100%',
      padding: '10px',
      backgroundColor: 'rgba(0, 0, 0, 0.8)',
      color: 'white',
      textAlign: 'center',
      backdropFilter: 'blur(5px)'
    }}>
      Created by <a href="https://wapdev.xyz" target="_blank" rel="noopener noreferrer" style={{ color: '#646cff', textDecoration: 'none' }}>wapdev.xyz</a>
    </footer>
  );
};

export default Footer;
