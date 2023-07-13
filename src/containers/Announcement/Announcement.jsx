import React from 'react';
import { getAuthenticatedHttpClient } from '@edx/frontend-platform/auth';
import { getConfig } from '@edx/frontend-platform';
import { Card } from '@edx/paragon';
import { useIntl } from '@edx/frontend-platform/i18n';
import './Announcement.scss';
import messages from './messages';

export const Announcement = () => {
  const [announcements, setAnnouncements] = React.useState(null);
  const { formatMessage } = useIntl();

  React.useEffect(() => {
    getAuthenticatedHttpClient().get(`${getConfig().LMS_BASE_URL}/announcements/page/1`).then(response => {
      if (response && response.data && response.data.announcements && response.data.announcements.length > 0) {
        setAnnouncements(response.data.announcements);
      }
    });
  });
  return announcements ? (
    <Card className="announcement-wrapper">
      <Card.Header
        title={formatMessage(messages.Announcement)}
      />
      <Card.Section>
        {announcements.map(item => (
          <div dangerouslySetInnerHTML={{ __html: item.content }} />
        ))}
      </Card.Section>
    </Card>
  ) : <></>;
};
