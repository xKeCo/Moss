import {
  Body,
  Button,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Img,
  Link,
  Preview,
  Section,
  Text,
} from '@react-email/components';
import * as React from 'react';
import { formatEmailDate } from '@/helpers';

interface ConfirmationEmailTemplateProps {
  patientName: string;
  appointmentDate: string;
  appointmentID: string;
  appointmentStartTime: string;
  appointmentStartTimeAMPM: string;
  appointmentEndTime: string;
  appointmentEndTimeAMPM: string;
}

const baseUrl = process.env.ENVIRONMENT_URL ?? 'http://localhost:3000';

export const ConfirmationEmailTemplate = ({
  patientName,
  appointmentDate,
  appointmentID,
  appointmentStartTime,
  appointmentStartTimeAMPM,
  appointmentEndTime,
  appointmentEndTimeAMPM,
}: ConfirmationEmailTemplateProps) => (
  <Html>
    <Head />
    <Preview>
      Tu cita está programada para el {formatEmailDate(appointmentDate)} a las{' '}
      {appointmentStartTime} {appointmentStartTimeAMPM}
    </Preview>
    <Body style={main}>
      <Container style={container}>
        <Img
          src="https://mossdental.vercel.app/logo11.png"
          width="48px"
          height="42px"
          alt="MOSS"
          style={logo}
        />

        <Heading style={heading}>Hola, {patientName}!</Heading>
        <Text style={paragraph}>
          Te recordamos que tienes una cita odontológica programada para:
        </Text>

        <code style={code}>
          {formatEmailDate(appointmentDate)}. <br />
          Hora: {appointmentStartTime} {appointmentStartTimeAMPM} - {appointmentEndTime}{' '}
          {appointmentEndTimeAMPM}
        </code>

        <Section style={buttonContainer}>
          {/* <Button style={button} href="https://wa.link/88sczk"> */}
          <Button style={button} href={`${baseUrl}/confirmation/appointment/${appointmentID}`}>
            Confirmar cita
          </Button>
        </Section>

        <Hr style={hr} />

        <Link href={baseUrl} style={reportLink}>
          MOSS
        </Link>
      </Container>
    </Body>
  </Html>
);

export default ConfirmationEmailTemplate;

const logo = {
  width: 42,
  height: 42,
};

const main = {
  backgroundColor: '#ffffff',
  fontFamily:
    '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Oxygen-Sans,Ubuntu,Cantarell,"Helvetica Neue",sans-serif',
};

const container = {
  margin: '0 auto',
  padding: '20px 0 48px',
  maxWidth: '560px',
};

const heading = {
  fontSize: '24px',
  letterSpacing: '-0.5px',
  lineHeight: '1.3',
  fontWeight: '400',
  color: '#484848',
  padding: '17px 0 0',
};

const paragraph = {
  margin: '0 0 15px',
  fontSize: '15px',
  lineHeight: '1.4',
  color: '#3c4149',
};

const buttonContainer = {
  padding: '27px 0 27px',
};

const button = {
  backgroundColor: '#5e6ad2',
  borderRadius: '3px',
  fontWeight: '600',
  color: '#fff',
  fontSize: '15px',
  textDecoration: 'none',
  textAlign: 'center' as const,
  display: 'block',
  padding: '11px 23px',
};

const reportLink = {
  fontSize: '14px',
  color: '#b4becc',
};

const hr = {
  borderColor: '#dfe1e4',
  margin: '42px 0 26px',
};

const code = {
  fontFamily: 'monospace',
  fontWeight: '700',
  padding: '1px 4px',
  backgroundColor: '#dfe1e4',
  letterSpacing: '-0.3px',
  fontSize: '21px',
  borderRadius: '4px',
  color: '#3c4149',
};
